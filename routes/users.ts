import express from 'express'
import { Request, Response, NextFunction } from 'express';
const router = express.Router();

// 获取用户列表
router.get('/', function (req: Request, res: Response, next: NextFunction) {
    res.send('respond with a resource');
});

export default router
