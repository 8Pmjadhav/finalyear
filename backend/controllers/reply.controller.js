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
    const user = req.user;
    let {flag,user_id,searchQuery,filter} = req.query;
    flag = Number(flag);user_id = Number(user_id);
    searchQuery=String(searchQuery);filter=Number(filter);

    
    try {
        let reply = null;

        
        if(flag===1){                   // flag 1 for search reply content 
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
                    },
                    _count:{
                        select:{
                            likes:true
                        }
                    },
                    likes:{
                        where:{
                            user_id:user.id
                        }
                    }
                },
                orderBy:{
                    created_At:'desc'
                }
            })
        }
        else if(flag===2){              // flag 2 for user's replies     
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
                    },
                    _count:{
                        select:{
                            likes:true
                        }
                    },
                    likes:{
                        where:{
                            user_id:user.id
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
            if(filter===2){
                reply.sort((a,b)=> b._count.likes - a._count.likes);
            }
            res.status(200).json({ status: 200, msg: "Replies fetched successfully",replies:reply });
        }
    } catch (error) {
        res.status(400).json({ status: 400, msg: "Error while gating user reply" });
    }


}

export async function likeReply(req,res){
    const user = req.user;
    const { reply_id } = req.params;
  
    try {
      const checkl = await prisma.likes.deleteMany({
        where:{
          user_id:user.id,
          reply_id:Number(reply_id)
        }
      })
    //   console.log(checkl);
      if(!checkl.count){
        await prisma.likes.create({
          data:{
            user_id:user.id,
            reply_id:Number(reply_id)
          }
        })
      }
      res.status(200).json({ status: 200, msg: "reply like updated successfully" });
  
    } catch (error) {
      res.status(400).json({ status: 200, msg: "Error while un/liking reply" });
  
    }
    
  }