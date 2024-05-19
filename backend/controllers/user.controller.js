"use strict";
import vine, { errors } from "@vinejs/vine";
import { loginSchema, registerSchema } from "../validations/auth.validations.js";
import prisma from "../DB/db.config.js";
import jwt from "jsonwebtoken";
import { GenerateACCESSToken, GenerateREFRESHToken } from "../Security/Tokens.js";
import {  sendOTPEmail } from "./email.controller.js";
import { hashPassword,generateOTP, checkPassword } from "./basic.controller.js";
import { default_images } from "../defaults/default_images.js";
import e from "express";
const options = {
    httpOnly: true,
    secure: true
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
        //  console.log("gat",{accessToken,refreshToken});       
        return { accessToken, refreshToken };
    }
    catch (error) {
        throw console.error({ status: 500, msg: "something went wrong while generating tokens" });
    }
};

export async function getCurrentUser(req, res) {
    const user = req.user;
    return res
        .status(200)
        .json(
            {
                status: 200,
                msg: "User Logged In",
                id:user.id,
                username: user.username,
                avatar: user.avatar,
                accessToken: user.accessToken,
                // refreshToken: user.refreshToken
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
            return res.status(400).json({ status: 400, msg: errorMsg });
        }

        payload.password = hashPassword(payload.password);
        const {otp,otpExpires} = generateOTP();
        

        newUser = await prisma.user.create({
            data: {
                ...payload,
                otp,
                otpExpires
            },
            select: {
                id: true,
                username: true,
                email: true
            }
        });
        await sendOTPEmail(newUser.email, otp);
        await default_images(newUser.id, newUser.username.charAt(0));
        return res.json({ status: 200, msg: "User created. OTP sent to email to verify.", user: newUser });


    }
    catch (error) {
        if (error instanceof errors.E_VALIDATION_ERROR) {
            console.log(error.messages)
            return res.status(400).json({ error: error.messages })
        }
        else {
            console.error(error)
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
                email: payload.email,
                
            }
        })



        if (finduser) {
            if(!finduser.isVerified){
                await prisma.user.deleteMany({
                    where:{
                        isVerified:false
                    }
                });
                return res.status(400).json({
                    status: 400,
                    msg: 'Email not verified SignUp with valid email !!'
                })
            }
            if (!checkPassword(payload.password,finduser.password)) {
                return res.status(400).json({
                    status: 400,
                    msg: 'Incorrect password    !!'
                })
            }
            const { accessToken, refreshToken } = await generateACCESSandREFRESHtokens(finduser.id);

            return res
                .status(200)
                .cookie("accessToken", accessToken, { maxAge:1000* 60 *60 * 24   })
                // .cookie("refreshToken", refreshToken, { maxAge: 60 * 60 * 24 * 10 * 1000 })
                .json(
                    {
                        status: 200,
                        msg: "User Logged In",
                        username: finduser.username,
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
            return res.status(500).json({ status: 500, msg: "something went wrong in login on server side" ,error})
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
        // .clearCookie("refreshToken", options)
        .json({
            status: 200,
            msg: "user logged out"
        })
};

export async function refreshAccessToken(req, res) {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
        return res.status(401).json({ status: 401, msg: "unauthorized request!, you dont have refreshToken" });
    }
    // console.log(incomingRefreshToken);
    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )
        // console.log(decodedToken);
        const user = await prisma.user.findUnique({
            where: {
                id: decodedToken?.id
            }
        });
        // console.log(user.id);
        if (!user) {
            return res.status(401).json({ status: 401, msg: "Invalid refreshToken" });
        }
        //console.log({incomingRefreshToken, refreshToken:user.refreshToken});
        if (incomingRefreshToken !== user?.refreshToken) {
            return res.status(401).json({ status: 401, msg: "Refresh token is expired or inValid" });

        }

        const tokens = await generateACCESSandREFRESHtokens(user.id);
        accessToken = tokens.accessToken;
        const newrefreshToken = tokens.refreshToken;
        console.log({ accessToken, newrefreshToken });

        return res
            .status(200)
            .cookie("accessToken", accessToken, { httpOnly: true, secure: true, maxAge: 60 * 60 * 24 * 1000 })
            .cookie("refreshToken", newrefreshToken, { httpOnly: true, secure: true, maxAge: 60 * 60 * 24 * 1000 * 10 })
            .json({
                status: 200,
                data: {
                    username: user.username,
                    accessToken,
                    refreshToken: newrefreshToken
                },
                msg: "Access token refreshed"
            })
    }
    catch (err) {
        return res.status(401).json({ status: 401, error: err?.message + " that is Refresh token is expired or used" });
    }
} 
