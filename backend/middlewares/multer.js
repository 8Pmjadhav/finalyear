import multer from "multer";

const storage = multer.diskStorage({
    
    destination: function (req, file, cb) {
      cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {
      console.log(req.user,file.fieldname);
      const ext = file.mimetype.split('/');
      cb(null, req.user.username+ file.fieldname + "file."+ ext[1]);
    }
  })
  
export const upload = multer({ 
    storage, 
})