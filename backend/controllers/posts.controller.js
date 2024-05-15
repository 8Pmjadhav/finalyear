import prisma from "../DB/db.config.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export async function getTweets(req, res) {
    try {
        const currentDate = new Date();
        // Calculate the date 5 days ago
        const fiveDaysAgo = new Date(currentDate.getTime() - 5 * 24 * 60 * 60 * 1000);

        const posts = await prisma.post.findMany({
            where: {
                created_At: {
                    // Filter posts created after the calculated date
                    gte: fiveDaysAgo,
                },
            },
            include: {
                user: {
                    select: {
                        username: true,
                        avatar: true
                    }
                }
            },
        });

        // Calculate counts for replies and likes for each post
       
        return res
            .status(200)
            .json({status:200,posts});

    } catch (error) {
        return res.status(500).json({ status: 500, msg: error?.message + "Error while getting Posts" });
    }
}

export async function viewTweet(req, res) {
    try {
        const {post_id} = req.query
        const user = req.user;
        const post = await prisma.post.findUnique({
            where: {
                id:Number(post_id)
            },
            include: {
                user: {
                    select: {
                        username: true,
                        avatar: true
                    }
                },
                reply:{
                    
                },
                likes:{

                }
            },

        });

        // Calculate counts for replies and likes for each post
       
        return res
            .status(200)
            .json({status:200,post});

    } catch (error) {
        return res.status(500).json({ status: 500, msg: error?.message + "Error while getting Post" });
    }
}

export async function tweetPost(req, res) {
    try {
        const contents = req.body;
        const user = req.user;
        console.log('Request Files:', req.files);
        console.log('Request Body:', req.body);
        // console.log(req.files, contents);

        let image = false;
        let video = false;

        if (req.files && req.files.image && req.files.image[0]) {
            console.log("Processing image upload");
            image = await uploadOnCloudinary(req.files.image[0].path, 'posts/images');
        }
        if (req.files && req.files.video && req.files.video[0]) {
            console.log("Processing video upload");
            video = await uploadOnCloudinary(req.files.video[0].path, 'posts/videos');
        }

        const tweetData = {
            user_id: user.id,
            content: contents.content,
        };

        if (image) {
            tweetData.image_id = image.public_id;
            tweetData.image = image.url;
        }

        if (video) {
            tweetData.video_id = video.public_id;
            tweetData.video = video.url;
        }

        const tweet = await prisma.post.create({ data: tweetData });

        return res.status(200).json({
            status: 200,
            msg: "Post created",
            url: tweet.id
        });
    } catch (error) {
        console.error("Error while creating post:", error);
        return res.status(500).json({ status: 500, msg: error.message + " Error while creating Post" });
    }
}


