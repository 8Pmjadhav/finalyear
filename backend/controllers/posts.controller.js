import prisma from "../DB/db.config.js";

export async function tweetPost(req,res){
    const contents = req.body;
    const user = req.user;
    const tweet = await prisma.post.create({
        data:{
            user_id:user.id,
            image_id:contents?.image_id,
            image:contents?.image,
            content:contents.content,
            video_id:contents?.video_id,
            video:contents.video
        }
    }
    )
}