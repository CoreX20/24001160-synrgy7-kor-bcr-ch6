import multer, { FileFilterCallback } from "multer";
import {Request} from "express";
const validateFiletype = (allowedMimeTypes: string[]) => {
    return (req : Request, file: Express.Multer.File, cb: FileFilterCallback) :void =>  {
        if (allowedMimeTypes.includes(file.mimetype)){
            cb(null,true)
        } else {
            cb(null, false);
        }
    }
}

const upload = multer({
    storage : multer.memoryStorage(),
    fileFilter : validateFiletype(['image/bmp', 'image/jpeg', 'image/x-png', 'image/png', 'image/gif', 'image/webp'])
})

export default upload;