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