import express from 'express'
import { Request, Response, NextFunction } from 'express';
const router = express.Router();

// 获取主页
router.get('/', function (req: Request, res: Response, next: NextFunction) {
    res.render('index', { title: 'Express' });
});

export default router
