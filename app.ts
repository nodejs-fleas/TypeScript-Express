import createError, { HttpError } from 'http-errors'
import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import { Request, Response, NextFunction } from 'express';
import indexRouter from './routes/index'
import usersRouter from './routes/users'

const app = express();

// 设置视图引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade')

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// 抓住404异常，将其转发给错误处理程序
app.use(function(req: Request, res: Response, next: NextFunction) {
    next(createError(404));
});

// 异常处理
app.use(function(err: HttpError, req: Request, res: Response, next: NextFunction) {
    // 设置局部变量，仅在开发时提供错误
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // 渲染异常页面
    res.status(err.status || 500);
    res.render('error');
});

export default app