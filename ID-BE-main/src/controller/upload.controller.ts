import { NextFunction, Request, Response } from 'express';
import { createFile } from '../services/file';
import UploadService from "../services/upload";

export const upload = async (req: any, res: Response, next: NextFunction): Promise<void> => {
    const uploadService = new UploadService();
    try {
        const {filename, size, format, data} = req.body;
        const {id: userId} = req.payload;
        const result = await uploadService.uploadFile(filename, Buffer.from(data));
        await createFile({
            filename,
            size,
            format,
            userId
        });
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};