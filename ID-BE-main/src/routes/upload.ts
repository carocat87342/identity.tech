import { Router } from 'express';
import { upload } from '../controller/upload.controller';

const router = Router();

router.post('/', upload);

export default router;