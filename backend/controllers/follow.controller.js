import prisma from "../DB/db.config.js";


export async function follow_un_User(req, res) {

    try {
        const user = req.user;
        const { user_id } = req.body;

        const unfollow = await prisma.follow.deleteMany({
            where: {
                follower_id: user.id,
                following_id: Number(user_id)
            }
        })
        if (!unfollow.count) {
            await prisma.follow.create({
                data: {
                    follower_id: user.id,
                    following_id: Number(user_id)
                }
            })
            return res.status(200).json({ status: 200, msg: 'following' });
        }
        return res.status(200).json({ status: 200, msg: 'follow' });
    } catch (error) {
        return res.status(400).json({ status: 400, msg: 'error while setting follow status' });
    }

}

export async function getPeople(req, res) {
    try {
        // const user = req.user;
        let { flag, user_id, searchQuery,filter } = req.query;
        flag = Number(flag); user_id = Number(user_id); 
        searchQuery = String(searchQuery);filter = Number(filter);
        let people = null;
        if (flag === 1) {                       // Followers of user
            people = await prisma.follow.findMany({
                where: {
                    following_id: Number(user_id)
                },
                include: {
                    follower: {
                        select: {
                            id: true,
                            username: true,
                            avatar: true,
                            _count: {
                                select: {
                                    followers: true,
                                    following: true
                                }
                            }
                        }
                    }
                }
            })
        }
        else if (flag === 2) {                // user Followings
            people = await prisma.follow.findMany({
                where: {
                    follower_id: Number(user_id)
                },
                include: {
                    following: {
                        select: {
                            id: true,
                            username: true,
                            avatar: true,
                            _count: {
                                select: {
                                    followers: true,
                                    following: true
                                }
                            }
                        },
                    }
                },


            })
        }
        else if (flag === 3) {
            people = await prisma.user.findMany({
                where: {
                    username: {
                        contains: searchQuery,
                        mode: 'insensitive'
                    }
                },

                select: {
                    id: true,
                    username: true,
                    avatar: true,
                    _count: {
                        select: {
                            followers: true,
                            following: true
                        }
                    }
                }


            })
        }
        if(filter === 2){
            console.log(
                people
            );
            people.sort((a,b)=> b._count.following - a._count.following);
        }
        return res.status(200).json({ status: 200, msg: 'followers fetched successfully', people });
    } catch (error) {
        return res.status(400).json({ status: 400, msg: 'error while fetching followers' });
    }
}