import { Router } from 'express';
import {upload} from '../controller/upload.controller';
import {invite, deleteUser} from '../controller/user.controller';

const router = Router();

router.post('/upload', upload)
router.get('/user/invite', invite);
router.delete('/user/delete', deleteUser);

export default router;
