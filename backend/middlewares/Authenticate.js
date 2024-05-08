import jwt from "jsonwebtoken"
import prisma from "../DB/db.config.js";

export const verifyJWT = async (req, res, next) => {
    try {
        const token = req?.cookies?.accessToken || req?.header("Authorization")?.replace("Bearer ", "")

        if (!token) {    
            return res.status(404).json({ status: 404, msg: 'token not found' })
        }
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        console.log('At verifyJWT : ',decodedToken);
        if (!decodedToken.id) {
            return res.status(401).json({ status: 401, msg: 'unauthorized user' })
        }
        const user = await prisma.user.findUnique({
            where: {
                id: decodedToken.id
            },
        })

        if (!user) {
            return res.status(401).json({ status: 401, msg: error?.message || "Invalid access token" })
        }
        user.password = undefined; user.refreshToken = undefined;
        req.user = user;
        req.user.accessToken = token;
        next();
    } catch (error) {
        return res.status(401).json({ status: 401, msg: {err:error?.message,means:"there is no user logged in"} || "Invalid access token" })
    }
}