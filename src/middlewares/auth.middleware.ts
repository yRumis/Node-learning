import { type Request, type Response, type NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import dotenv from 'dotenv'

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET as string;

export interface JwtPayload{
    id: number;
    email: string
}

export const authMiddleware = ( req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).json({error: 'Token nao fornecida'});
    }

    const token = authHeader.split(' ')[1] as string;

    try{
        const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;

        req.user = decoded;

        next();

    }catch(error){
        return res.status(401).json({ error: " token invalido"});
    }
}