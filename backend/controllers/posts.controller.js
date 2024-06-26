import prisma from "../DB/db.config.js";
import { deleteOnCloudinary, uploadOnCloudinary } from "../utils/cloudinary.js";
import { mergeSort } from "./algorithm.js";

export async function getTweets(req, res) {
  try {
    const currentDate = new Date();
    const user = req.user;
    let {flag,user_id,searchQuery,filter}  = req.query;  
    flag = Number(flag);user_id = Number(user_id);searchQuery=String(searchQuery);filter=Number(filter);
    // console.log(req.query,flag,user_id);
  
    // Calculate the date 365 days ago
    const OneYearAgo = new Date(currentDate.getTime() - 365 * 24 * 60 * 60 * 1000);
    let posts = null;
    
    if(flag===10){              // flag=10 following posts
      posts = await prisma.post.findMany({
        where: {
          user:{
            following:{
              some:{
                follower_id:user.id
              }
            }
          }
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
    }
    else if(flag===0){          // all posts
       posts = await prisma.post.findMany({
        where: {
          created_At: {
            // Filter posts created after the calculated date
            gte: OneYearAgo,
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
    }
    else if(flag===1){          // user's post
       posts = await prisma.post.findMany({
        where: {
          user_id:user_id
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
      // console.log(posts);
    }
    else if(flag === 2){        // posts and replies liked by user
      posts = await prisma.post.findMany({
        where: {
          likes:{
            some:{
              user_id:user_id
            }
          }
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

      const replies =  await prisma.reply.findMany({
        where: {
          likes:{
            some:{
              user_id:user_id
            }
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
      const postandReplies = mergeSort(filter,posts,replies);
      // console.log(posts);
      return res
      .status(200)
      .json({ status: 200, posts:postandReplies });
    }
    else if(flag === 3){        // posts search by content
      posts = await prisma.post.findMany({
        where: {
            content:{
              // contains:`${searchQuery} | ${searchQuery.toUpperCase()} | ${searchQuery.toLowerCase()}`,
              contains:searchQuery,
              mode:'insensitive'
            }
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
      // console.log(posts);
    }

    if(filter===2){
      posts.sort((a,b) => b._count.likes - a._count.likes);
    }
    

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
    const {filter} = req.query;
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
            },
            likes:{
              where: {
                user_id:user.id
              }
            },
            _count:{
              select:{
                likes:true
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
                id:true,
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
    if(postData.reply && Number(filter) === 2){
      postData.reply.sort((a,b) => b._count.likes - a._count.likes);
    }
   
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
    const data = req.body;
    const user = req.user;
    const { post_id } = req.params;

    console.log('Request Files:', req.files,post_id);
    console.log('Request Body:', req.body);
    data.deleteiv = JSON.parse(data.deleteiv);
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

    const tweetData = {
      user_id: user.id,
      content: data.content,
    };

    if(data.deleteiv.image){
      console.log("Processing image delete");
      prevPost.image_id && await deleteOnCloudinary(prevPost.image_id);
      tweetData.image_id = null;
      tweetData.image = null;
      console.log('Completed');
    }
    else if (req.files && req.files.image && req.files.image[0]) {
      console.log("Processing new image upload ... ");
      prevPost.image_id && await deleteOnCloudinary(prevPost.image_id);
      image = await uploadOnCloudinary(req.files.image[0].path, 'posts/images');
      tweetData.image_id = image.public_id;
      tweetData.image = image.url;
      console.log('Completed');
    }

    if(data.deleteiv.video){
      console.log("Processing video delete");
      prevPost.video_id && await deleteOnCloudinary(prevPost.video_id);
      tweetData.video_id = null;
      tweetData.video = null;
      console.log('Completed');
    }
    else if (req.files && req.files.video && req.files.video[0]) {
      console.log("Processing video upload");
      prevPost.video_id && await deleteOnCloudinary(prevPost.video_id);
      video = await uploadOnCloudinary(req.files.video[0].path, 'posts/videos');
      tweetData.video_id = video.public_id;
      tweetData.video = video.url;
      console.log('Completed');
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
