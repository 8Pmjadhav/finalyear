import prisma from "../DB/db.config.js";
import { deleteOnCloudinary, uploadOnCloudinary } from "../utils/cloudinary.js";

export async function getTweets(req, res) {
  try {
    const currentDate = new Date();
    const user = req.user;
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
        },
        _count:{
          select:{
            reply:true,
            likes:true
          }
        },
        likes:{
          where:{
            user_id:user.id
          }
        }
      },
      orderBy:[
        {
          created_At:'desc'
        }
      ]
    });

    // Calculate counts for replies and likes for each post
    return res
      .status(200)
      .json({ status: 200, posts });

  } catch (error) {
    return res.status(500).json({ status: 500, msg: error?.message + "Error while getting Posts" });
  }
}

export async function viewTweet(req, res) {
  try {
    const { post_id } = req.params
    const user = req.user;
    const postData = await prisma.post.findUnique({
      where: {
        id: Number(post_id)
      },
      include: {
        user: {
          select: {
            username: true,
            avatar: true
          }
        },
        reply: {
          include: {
            user: {
              select: {
                username: true,
                avatar: true
              }
            }
          },
          orderBy:[
            {
              created_At:'desc'
            }
          ]
        },
        likes: {
          include: {
            user: {
              select: {
                username: true,
                avatar: true
              }
            }
          }
        },
        _count:{
          select:{
            reply:true,
            likes:true
          }
        },
      }
    });
    // const post = await prisma.post.findUnique({
    //     where: {
    //         id:Number(post_id)
    //     },
    //     include: {
    //         user: {
    //             select: {
    //                 username: true,
    //                 avatar: true
    //             }
    //         },
    //         reply:{

    //         },
    //         likes:{

    //         }
    //     },

    // });

    // Calculate counts for replies and likes for each post

    return res
      .status(200)
      .json({ status: 200, postData });

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
      id: tweet.id
    });
  } catch (error) {
    console.error("Error while creating post:", error);
    return res.status(500).json({ status: 500, msg: error.message + " Error while creating Post" });
  }
}

export async function deletePost(req, res) {
  const user = req.user;
  const { post_id } = req.params;

  try {
    const post = await prisma.post.findFirst({
      where: {
        user_id: user.id,
        id: Number(post_id)
      }
    })
    if (post) {
      await deleteOnCloudinary(post.image_id);
      await deleteOnCloudinary(post.video_id);
      await prisma.post.delete({
        where: {
          user_id: user.id,
          id: Number(post_id)
        }
      })
      console.log(post);
      res.status(200).json({ status: 200, msg: "Post Deleted successfully", p: post });
    }
  } catch (error) {
    res.status(400).json({ status: 200, msg: "Error while deleting Post" });
  }


}

export async function editTweet(req, res) {
  try {
    const contents = req.body;
    const user = req.user;
    const { post_id } = req.params;

    console.log('Request Files:', req.files,post_id);
    console.log('Request Body:', req.body);
    // console.log(req.files, contents);
    const prevPost = await prisma.post.findFirst({
      where:{
        id:Number(post_id)
      }
    })
    if(!prevPost){
      return res.status(404).json({ status: 404, msg: error.message + " Post not found" });
    }

    let image = false;
    let video = false;

    if (req.files && req.files.image && req.files.image[0]) {
      console.log("Processing image upload");
      prevPost.image_id && await deleteOnCloudinary(prevPost.image_id);
      image = await uploadOnCloudinary(req.files.image[0].path, 'posts/images');
    }
    if (req.files && req.files.video && req.files.video[0]) {
      console.log("Processing video upload");
      prevPost.video_id && await deleteOnCloudinary(prevPost.video_id);
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

    const tweet = await prisma.post.update({ 
      where:{
        id:prevPost.id
      },
      data: tweetData 
    });

    return res.status(200).json({
      status: 200,
      msg: "Post updated",
      url: tweet.id
    });
  } catch (error) {
    console.error("Error while updating post:", error);
    return res.status(500).json({ status: 500, msg: error.message + " Error while updating Post" });
  }
}

export async function likePost(req,res){
  const user = req.user;
  const { post_id } = req.params;

  try {
    const checkl = await prisma.likes.deleteMany({
      where:{
        user_id:user.id,
        post_id:Number(post_id)
      }
    })
    console.log(checkl);
    if(!checkl.count){
      await prisma.likes.create({
        data:{
          user_id:user.id,
          post_id:Number(post_id)
        }
      })
    }
    res.status(200).json({ status: 200, msg: "like updated successfully" });

  } catch (error) {
    res.status(400).json({ status: 200, msg: "Error while un/liking Post" });

  }
  
}
