import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import 'dotenv/config'

interface JwtPayload {
    id: number;
}

declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload;
        }
    }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.replace('Bearer ','');
    if (!token) {
        return res.status(403).json({ error: 'No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY!, (err, decoded) => {
        if (err) {
            // console.log('INVALID TOKEN:\n token given:',token, '\nsecret key:\n',process.env.JWT_SECRET_KEY)
            return res.status(401).json({ error: 'Invalid token' });
        }
        req.user = decoded as JwtPayload;
        next();
    });
};
export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.replace('Bearer ','');

    if (!token) {
        return res.status(401).json({ message: 'No token provided, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!) as JwtPayload;
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token, authorization denied' });
    }
};