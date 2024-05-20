import prisma from "../DB/db.config.js";


export async function doReply(req, res) {
    const user = req.user;
    const {post_id} = req.params;
    const { newReply } = req.body;
    console.log(req.body);
    try {
        const reply = await prisma.reply.create({
            data: {
                user_id: user.id,
                post_id:Number(post_id),
                content:String(newReply)
            }
        })
        if (reply) {
            console.log(reply);
            res.status(200).json({ status: 200, msg: "Replied successfully",r:reply });
        }
    } catch (error) {
        res.status(400).json({ status: 200, msg: "Error while replying" });
    }
}

export async function editReply(req, res) {
    const user = req.user;
    const {reply_id} = req.params;
    const { replyContent } = req.body;

    // console.log(req.body);
    try {
        const reply = await prisma.reply.update({
            where:{
                id:Number(reply_id),
                user_id:user.id
            },
            data: {
                content:String(replyContent),
            }
        })
        if (reply) {
            console.log(reply ,'success');
            res.status(200).json({ status: 200, msg: "Replied edited successfully",r:reply });
        }
    } catch (error) {
        res.status(400).json({ status: 200, msg: "Error while editing replying" });
    }
}

export async function deleteReply(req, res) {
    const user = req.user;
    const {reply_id} = req.params;
    
    try {
        const reply = await prisma.reply.delete({
            where: {
                user_id:user.id,
                id:Number(reply_id)
            }
        })
        if (reply) {
            console.log(reply);
            res.status(200).json({ status: 200, msg: "Reply Deleted successfully",r:reply });
        }
    } catch (error) {
        res.status(400).json({ status: 200, msg: "Error while deleting reply" });
    }


}

export async function getUserReplies(req, res) {
    // const user = req.user;
    const {flag,user_id,searchQuery} = req.query;
    
    try {
        // flag 1 for search reply content
        let reply = null;
        if(flag){
             reply = await prisma.reply.findMany({
                where: {
                    content:{
                        contains:String(searchQuery),
                        mode:'insensitive'
                    }
                },
                include:{
                    user:{
                        select:{
                            username:true,
                            avatar:true
                        }
                    }
                },
                orderBy:{
                    created_At:'desc'
                }
            })
        }
        else{
             reply = await prisma.reply.findMany({
                where: {
                    user_id:Number(user_id),
                },
                include:{
                    user:{
                        select:{
                            username:true,
                            avatar:true
                        }
                    }
                },
                orderBy:{
                    created_At:'desc'
                }
            })
        }
        
        if (reply) {
            // console.log(reply);
            res.status(200).json({ status: 200, msg: "Replies fetched successfully",replies:reply });
        }
    } catch (error) {
        res.status(400).json({ status: 400, msg: "Error while gating user reply" });
    }


}