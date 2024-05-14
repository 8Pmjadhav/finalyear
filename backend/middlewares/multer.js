import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {
        const ext = file.mimetype.split('/')[1];
        cb(null, `${req.user.username}-${file.fieldname}-${Date.now()}.${ext}`);
    }
});

export const upload = multer({ storage });
