import nodemailer from 'nodemailer';
import prisma from '../DB/db.config.js';
import { default_images } from '../defaults/default_images.js';

export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    service: 'Gmail',
    auth: {
        user: String(process.env.EMAIL),
        pass: String(process.env.EMAIL_PASSWORD),
    },
})


export async function verifyOTP(req, res) {
    try {
        const { email, otp } = req.body;

        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user || user.otp !== otp || new Date() > new Date(user.otpExpires)) {
            await prisma.user.delete({
                where: { email }
            })
            return res.status(400).json({ status: 400, msg: 'Invalid or expired OTP' });
        }

        await prisma.user.update({
            where: { email },
            data: {
                otp: null,
                otpExpires: null,
                isVerified: true
            }
        });
        await default_images(newUser.id, newUser.username.charAt(0));
        return res.status(200).json({ status: 200, msg: 'OTP verified successfully' });

    } catch (error) {
        return res.status(500).json({ status: 500, msg: 'Something went wrong on server side' });
    }
}

export const sendOTPEmail = async (email, otp) => {
    console.log(email, otp);
    const mailOptions = {
        from: String(process.env.EMAIL),
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}. It will expire in 10 minutes.`
    };
    await transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};

export const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};