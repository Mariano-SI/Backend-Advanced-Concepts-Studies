import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import AppError from '../../../shared/errors/AppError';
export default function isAuthenticated(request: Request, response: Response, next: NextFunction):void{
    const authHeader = request.headers.authorization;

    if(!authHeader){
        throw new AppError('JWT token is missing.', 401);
    }

    const [, token] = authHeader.split(' ');

    try {
        const decodeToken = verify(token, process.env.JWT_SECRET);
        return next();
    } catch (error) {
        throw new AppError('Invalid JWT token.', 401);
    }
}