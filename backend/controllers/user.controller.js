"use strict";
import vine, { errors } from "@vinejs/vine";
import { loginSchema, registerSchema } from "../validations/auth.validations.js";
import bcryptjs from 'bcryptjs';
import prisma from "../DB/db.config.js";
import jwt from "jsonwebtoken";
import { GenerateACCESSToken, GenerateREFRESHToken } from "../Security/Tokens.js";
import { default_images } from "../defaults/default_images.js";

const options={
    httpOnly:true,
    secure:true
}

export async function generateACCESSandREFRESHtokens(userId) {
    try {
        const user = await prisma.user.findFirst({
            where: {
                id: userId
            }
        })
        const accessToken = GenerateACCESSToken(user);
        const refreshToken = GenerateREFRESHToken(user);

        await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                refreshToken: refreshToken
            }
        });
        // console.log({accessToken,refreshToken});       
        return { accessToken, refreshToken };           
    }
    catch (error) {
        throw console.error({ status: 500, msg: "something went wrong while generating tokens" });
    }
};

export async function getCurrentUser(req,res){
    const user = req.user;
    return res
        .status(200)
        .json(
            {
                status: 200,
                msg: "User Logged In",
                username:user.username,
                accessToken:user.accessToken,
                refreshToken:user.refreshToken
            }
        )

}

export async function register(req, res) {
    try {
        let newUser = req.body;
        //user = JSON.parse(user);
        //console.log(newUser);
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
            console.log('already');
            return res.status(400).json({ status: 400, errors: errorMsg });
        }

        const salt = bcryptjs.genSaltSync(10);
        payload.password = bcryptjs.hashSync(payload.password, salt);

        newUser = await prisma.user.create({
            data: payload,
            select: {
                id: true,
                username: true,
                email: true
            }
        })
        await default_images(newUser.id,newUser.username.charAt(0));
        console.log(newUser);
        return res.json({ status: 200, msg: "User created : ", user: newUser });


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
export async function login(req, res) {
    try {
        const data = req.body;
        const validator = vine.compile(loginSchema);
        const payload = await validator.validate(data);

        const finduser = await prisma.user.findUnique({
            where: {
                email: payload.email
            }
        })


        if (finduser) {
            if (!bcryptjs.compareSync(payload.password, finduser.password)) {
                return res.status(400).json({
                    errors: {
                        password: "incorrect password"
                    }
                })
            }
            const { accessToken, refreshToken } = await generateACCESSandREFRESHtokens(finduser.id);
            // console.log(accessToken, refreshToken);

            return res
                .status(200)
                .cookie("accessToken", accessToken, {httpOnly:true,secure:true,maxAge:60*60*24*1000})
                .cookie("refreshToken", refreshToken,{httpOnly:true,secure:true,maxAge:60*60*24*10*1000})
                .json(
                    {
                        status: 200,
                        msg: "User Logged In",
                        username:finduser.username,
                        accessToken,
                        refreshToken
                    }
                )

        }
        return res.status(404).json({ status: 404, msg: "user with this email not created" });
    }
    catch (error) {
        if (error instanceof errors.E_VALIDATION_ERROR) {
            console.log(error.messages)
            return res.status(400).json({ error: error.messages })
        }
        else {
            return res.status(500).json({ status: 500, msg: "something went wrong in login on server side" })
        }
    }
}

export async function logout(req, res) {
    // console.log(req.user);
    await prisma.user.update({
        where: {
            id: req.user.id
        },
        data: {
            refreshToken: undefined
        }
    });

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json({
            status: 200,
            msg: "user logged out"
        })
};

export async function refreshAccessToken(req,res) {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

    if(!incomingRefreshToken){
        return res.status(401).json({status:401,msg:"unauthorized request!, you dont have refreshToken"});
    }

    try{
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )

        const user = await prisma.user.findUnique({
            where:{
                id:decodedToken?.id
            }
        });

        if(!user){
            return res.status(401).json({status:401,msg:"Invalid refreshToken"});
        }

        if (incomingRefreshToken !== user?.refreshToken) {
            return res.status(401).json({status:401,msg:"Refresh token is expired or used"});
            
        }

        const {accessToken,newrefreshToken} = await generateACCESSandREFRESHtokens(user.id);

        return res
            .status(200)
            .cookie("accessToken",accessToken,options)
            .cookie("refreshToken",newrefreshToken,options)
            .json({
                status:200,
                data:{
                    accessToken,
                    refreshToken:newrefreshToken
                },
                msg:"Access token refreshed"
            })
    }
    catch(error){
        return res.status(401).json({status:401,err : error?.message + " that is Refresh token is expired or used"});
    }
} 
