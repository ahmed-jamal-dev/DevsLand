import { RequestHandler } from "express";

export const RequestLoggerMiddleware: RequestHandler = (req, res, next) => {
    console.log(req.method, req.path, '__body:', req.body );
    next();
};