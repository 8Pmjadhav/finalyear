import jwt from 'jsonwebtoken';

export  function GenerateACCESSToken (user){
    console.log(user);
    return jwt.sign(
        {
            id:user.id,
            username:user.username,
            email:user.email
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

export  function GenerateREFRESHToken (user){
    return jwt.sign(
        {
            id:user.id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}