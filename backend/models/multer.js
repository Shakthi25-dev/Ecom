import multer from "multer";
import {v4 as uuid} from "uuid";

// Configure storage settings for multer
const storage = multer.diskStorage({
    destination(req, file, cb){ // Set the destination folder for uploaded files
        cb(null, "./uploads")
    },
    filename(req, file, cb) { // Set the filename for uploaded files
        const id = uuid();
        const extension = file.originalname.split(".").pop();
        const filename = `${id}.${extension}`;
        cb(null, filename);
    }
});


export const uploadFiles = multer({ storage }).single("image");