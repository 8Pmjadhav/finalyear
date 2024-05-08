import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {
      console.log(req.user,file.mimetype);
      const ext = file.mimetype.split('/');
      cb(null, req.user.username + "_avatar_."+ ext[1]);
    }
  })
  
export const upload = multer({ 
    storage, 
})