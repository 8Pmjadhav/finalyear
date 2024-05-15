import bcryptjs from 'bcryptjs';


export function hashPassword(password){
    const salt = bcryptjs.genSaltSync(10);
    return bcryptjs.hashSync(password, salt);
}


export const generateOTP = () => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 2 * 60 * 1000); // OTP expires in 2 minutes
    return {otp,otpExpires}
};

export function checkPassword(password,hash){
    return bcryptjs.compareSync(password, hash);
}