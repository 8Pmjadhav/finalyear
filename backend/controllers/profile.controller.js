import prisma from "../DB/db.config.js";
import { deleteOnCloudinary, uploadOnCloudinary } from "../utils/cloudinary.js";

export async function getProfile(req, res) {
    try{const profilerUsername = req.query.username;
    // const currentUser = req.user;
    // if (profilerUsername === currentUser.username) {
    //     return res.redirect('/api/user/updateUser');
    // }
    const profiler = await prisma.user.findUnique({
        where: {
            username: profilerUsername
        },
        select: {
            id: true,
            username: true,
            email: true,
            avatar: true,
            backcover: true,
            description: true,
            post: true,
            reply: true,
            likes: true
        }
    });

    if (!profiler) {
        return res.status(400).json({ status: 404, msg: "User not found" });

    }

    return res
        .status(201)
        .json(profiler);
}
catch (error) {
    return res.status(500).json({status:500,msg:error?.message + "Error while gating Profile"});
}
}

export async function updateAvatar(req, res) {

    try {
        const Local_path = req.file?.path;
        const user = req.user;
        
        const oldImage = await prisma.user.findUnique({
            where: {
                id: user.id
            },
            select: {
                avatar_id: true
            }
        })

        if (oldImage) {
            const dele = await deleteOnCloudinary(oldImage.avatar_id,"new_avatar",'image');
        }
        const newURL = await uploadOnCloudinary(Local_path,'new_avatar');
        const newImage = await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                avatar_id:newURL.public_id,
                avatar: newURL.url
            }
        })
        return res
            .status(200)
            .json({
                status:200,
                msg:"Avatar updated",
                url:newURL.url
            });
    } catch (error) {
        return res.status(500).json({status:500,msg:error?.message + "Error while updating Avatar"});
    }
}

export async function updateBackcover(req, res) {

    try {
        const Local_path = req.file?.path;
        const user = req.user;
        
        const oldImage = await prisma.user.findUnique({
            where: {
                id: user.id
            },
            select: {
                backcover_id: true
            }
        })

        if (oldImage) {
            const dele = await deleteOnCloudinary(oldImage.backcover_id,"backcover",'image');
        }
        const newURL = await uploadOnCloudinary(Local_path,'backcover');
        const newImage = await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                backcover_id:newURL.public_id,
                backcover: newURL.url
            },
            select:{
                backcover:true
            }
        })
        return res
            .status(200)
            .json({
                status:200,
                msg:"Backcover updated",
                url:newImage.backcover
            });
    } catch (error) {
        return res.status(500).json({status:500,msg:error?.message + "Error while updating Backcover"});
    }
}

export async function updateDescription(req,res){
    try {
        const {description} = req.body;
        const user = req.user;

        const des = await prisma.user.update({
            where:{
                id:user.id
            },
            data:{
                description
            },
            select:{
                description:true
            }
        })

        return res
            .status(200)
            .json({
                status:200,
                msg:"Description updated",
                description:des.description
            });
        
    } catch (error) {
        return res.status(500).json({status:500,msg:error?.message + "Error while updating Backcover"});
    }
}

