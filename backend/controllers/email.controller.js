import nodemailer from 'nodemailer';
import prisma from '../DB/db.config.js';
import { generateOTP, hashPassword } from './basic.controller.js';
import { passwordSchema } from '../validations/auth.validations.js';
import vine, { errors } from "@vinejs/vine";
import e from 'express';

export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    service: 'Gmail',
    auth: {
        user: String(process.env.EMAIL),
        pass: String(process.env.EMAIL_APP_PASSWORD),
    },
})


export async function verifyOTPbeforeSignUp(req, res) {
    try {
        const { email, otp } = req.body;

        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user || user.otp !== otp || new Date() > new Date(user.otpExpires)) {
            await prisma.user.delete({
                where: { email }
            })
            return res.status(400).json({ status: 400, msg: 'Invalid or expired OTP SignUp again' });
        }

        await prisma.user.update({
            where: { email },
            data: {
                otp: null,
                otpExpires: null,
                isVerified: true
            }
        });
        return res.status(200).json({ status: 200, msg: 'OTP verified successfully' });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, msg: 'Something went wrong on server side' });
    }
}

export const sendOTPEmail = async (email, otp) => {
    console.log(email, otp);
    const mailOptions = {
        from: String(process.env.EMAIL),
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}. It will expire in 10 minutes.`,
        html: `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>OTP Verification</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    background-color: #f4f4f4;
                }
                .container {
                    max-width: 400px;
                    margin: 50px auto;
                    padding: 20px;
                    background-color: #ffffff;
                    border-radius: 5px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                h2 {
                    text-align: center;
                    color: #333333;
                }
                p {
                    text-align: center;
                    color: #666666;
                }
                .otp {
                    text-align: center;
                    font-size: 24px;
                    font-weight: bold;
                    color: #009688;
                    margin-bottom: 20px;
                }
                .btn {
                    display: block;
                    width: 100%;
                    padding: 10px;
                    margin-top: 20px;
                    text-align: center;
                    background-color: #009688;
                    color: #ffffff;
                    border: none;
                    border-radius: 3px;
                    text-decoration: none;
                }
                .btn:hover {
                    background-color: #00796b;
                }
                .container img {
                    display: block;
                    margin: 0 auto 20px auto; /* Center image and add space below */
                    width: 100px; /* Set desired width */
                    height: auto; /* Maintain aspect ratio */
                }
            </style>
        </head>
        <body>
            <div class="container">
                <img src="https://res.cloudinary.com/dooomcx1j/image/upload/v1715682190/avatar/hksr9q5x07cyjxp467ny.png"
                alt= "PJ Tweets"  >
                <h2>OTP Verification</h2>
                <p>Please use the following OTP to verify your account:</p>
                <div class="otp">${otp}</div>
                <p>This OTP is valid for a single use and will expire in 5 minutes.</p>
                
            </div>
        </body>
        </html>
        `
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            return res.status(400).json({ status: 200, msg: 'Wrong email address or SMTP server Problem' });
        } else {
            console.log('Email sent: ' + info.response);
            return res.status(200).json({ status: 200, msg: 'Check email for OTP' });
        }
    });
};



export async function ForgotPasswordGetOTP(req, res) {
    try {
        const { email } = req.body;

        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        })
        if (!user) {
            return res.status(400).json({ status: 400, msg: 'Email not found in database' });
        }
        const {otp,otpExpires} = generateOTP();

        await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                ...user,
                otp,
                otpExpires
            },
            select: {
                id: true,
                username: true,
                email: true
            }
        });
        await sendOTPEmail(email, otp);
        return res.status(200).json({ status: 200, msg: " OTP sent to email." });
    } catch (error) {
        return res.status(200).json({ status: 200, msg: " Error while sending  email.", error });
    }
}

export async function ForgotPasswordverifyOTP(req, res) {
    try {
        const { email, otp } = req.body;

        const user = await prisma.user.findUnique({
            where: { email }
        });

        if ( user.otp !== otp || new Date() > new Date(user.otpExpires)) {
            
            return res.status(400).json({ status: 400, msg: 'Invalid or expired OTP SignUp again' });
        }

        
        return res.status(200).json({ status: 200, msg: 'OTP verified successfully' });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, msg: 'Something went wrong on server side' });
    }
}

export async function resetPassword(req, res) {

    try {
        let { email, password, password_confirmation, otp } = req.body;
        const validator = vine.compile(passwordSchema);
        const payload = await validator.validate({password,password_confirmation});
        password = hashPassword(payload.password);

        const upd = await prisma.user.update({
            where:{
                email,
                otp
            },
            data:{
                password,
                otp: null,
                otpExpires:null
            }
        });
        if(upd){
        
            return res.status(200).json({status:200,msg:'Password changed successfully login noww '});

        }
        return res.status(400).json({ status: 400, msg: "First verify otp" })
    } catch (error) {
        if (error instanceof errors.E_VALIDATION_ERROR) {
            console.log(error.messages)
            return res.status(400).json({ error: error.messages })
        }
        else {
            console.log(error);
            return res.status(500).json({ status: 500, msg: "something went wrong on server side" })
        }
    }
}