import decryptData from "../Security/Decryption.js";
import vine, { errors } from "@vinejs/vine";
import { loginSchema, registerSchema } from "../validations/auth.validations.js";
import bcryptjs from 'bcryptjs';
import prisma from "../DB/db.config.js";


class UserController {
    static async register(req, res) {
        try {
            const newUser = decryptData(req.body.encryptedData);
            //user = JSON.parse(user);
            console.log(newUser.username);
            const validator = vine.compile(registerSchema);
            const payload = await validator.validate(newUser);

            const finduser = await prisma.user.findFirst({
                where: {
                    OR: [
                        {
                            username: payload.username
                        },
                        {
                            email: payload.email
                        }
                    ]
                }
            })

            if (finduser) {
                let errorMsg = '';
                if (finduser.username === payload.username) {
                    errorMsg += 'name is already taken ';
                }
                if (finduser.email === payload.email) {
                    errorMsg += 'email is already taken ';
                }
                return res.status(409).json({ status: 409, errors: errorMsg });
            }

            const salt = bcryptjs.genSaltSync(10);
             payload.password = bcryptjs.hashSync(payload.password, salt);

            newUser = await prisma.user.create({
                data:payload,
                select:{
                    id:true,
                    username:true,
                    email:true
                }
            })

            return res.json({ status: 200, msg: "User created", user: newUser });


        }
        catch (error) {
            if (error instanceof errors.E_VALIDATION_ERROR) {
                console.log(error.messages)
                return res.json({ error: error.messages })
            }
            else {
                return res.status(500).json({ status: 500, msg: "something went wrong on server side" })
            }
        }
    }
    static async login(req, res) {
        try {
            console.log();
            const data = decryptData(req.body.encryptedData);
            const validator = vine.compile(loginSchema);
            const payload = await validator.validate(data);

            const finduser = await prisma.user.findUnique({
                where:{
                    email:payload.email
                }
            })

            
            //console.log(finduser);
            if(finduser){
                if(!bcryptjs.compareSync(payload.password,finduser.password)){
                    return res.status(400).json({
                        errors:{
                            password:"incorrect password"
                        }
                    })
                }

                const payloadData = {
                    id:finduser.id,
                    username:finduser.username,
                    email:finduser.email,
                }
                //payloadData = JSON.parse(payloadData);
                console.log(payloadData);
                return res.json({status:200,msg:"Logged In",access_token:payloadData});
            }
            return res.json({status:400,msg:"user with this email not created"});
        }
        catch (error) {
            if (error instanceof errors.E_VALIDATION_ERROR) {
                console.log(error.messages)
                return res.json({ error: error.messages })
            }
            else {
                return res.status(500).json({ status: 500, msg: "something went wrong on server side" })
            }
        }
    }
}

export default UserController;