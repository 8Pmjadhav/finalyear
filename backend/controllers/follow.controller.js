import prisma from "../DB/db.config.js";


export async function follow_un_User(req, res) {

    try {
        const user = req.user;
        const { user_id } = req.body;

        const unfollow = await prisma.follow.deleteMany({
            where:{
                follower_id:user.id,
                following_id:Number(user_id)
            }
        })
        if(!unfollow.count){
            await prisma.follow.create({
                data:{
                    follower_id:user.id,
                    following_id:Number(user_id)
                }
            })
            return res.status(200).json({status:200,msg:'following'});
        }
        return res.status(200).json({status:200,msg:'follow'});
    } catch (error) {
        return res.status(400).json({status:400,msg:'error while setting follow status'});
    }

}

export async function getPeople(req,res){
    try {
        // const user = req.user;
        let { flag,user_id } = req.query;
        flag = Number(flag); user_id = Number(user_id);
        let people = null;
        if(flag===1){
            people = await prisma.follow.findMany({
            where:{
                following_id:Number(user_id)
            },
            include:{
                follower:{
                    select:{
                        username:true,
                        avatar:true
                    }
                }
            }
        })
        }
        else if(flag === 2){
            people = await prisma.follow.findMany({
                where:{
                    follower_id:Number(user_id)
                },
                include:{
                    following:{
                        select:{
                            username:true,
                            avatar:true
                        }
                    }
                }
            })
        }
        return res.status(200).json({status:200,msg:'followers fetched successfully',people});
    } catch (error) {
        return res.status(400).json({status:400,msg:'error while fetching followers'});
    }
}