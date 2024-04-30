import decryptData from "../Security/Decryption.js";
import vine,{errors} from "@vinejs/vine";
import { registerSchema } from "../validations/auth.validations.js";
import bcryptjs from 'bcryptjs';
import prisma from "../DB/db.config.js";
import { empty } from "@prisma/client/runtime/library";


class UserController {
    static async register(req, res) {
        try {
            const newUser = decryptData(req.body.encryptedData);
            //user = JSON.parse(user);
            console.log(newUser.username);
            const validator = vine.compile(registerSchema);
            const payload = await validator.validate(newUser);

            const finduser = await prisma.user.findFirst({
                where:{
                    OR:[
                        {
                            username:payload.username
                        },
                        {
                            email:payload.email
                        }
                    ]
                }
            })

            if(finduser){
                return res.json({status:400,msg:"Username or email already taken use another"});
            }
            
            const salt = bcryptjs.genSaltSync(10);
            const hashedPassword = bcryptjs.hashSync(payload.password,salt);

            newUser = await prisma.user.create({
                data:{
                    username:payload.username,
                    email:payload.email,
                    password:hashedPassword
                }
            })

            return res.json({status:200,msg:"User created",user:newUser});


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
        console.log(decryptData(req.body.encryptedData));
        return res.json({ status: 200, msg: "logged in" })
    }
}

export default UserController;