import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../models';
import 'dotenv/config'

export const register = async (req: Request, res: Response) => {
    const { visibleName, username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const user = await User.create({ visibleName, username, password: hashedPassword });
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY!, { expiresIn: '2h' });
        res.status(201).json({ user, token });
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
};

export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY!, { expiresIn: '2h' });
    res.json({ user, token });
};

export const getUserDetails = async (req: Request, res: Response) => {
    try {
        const userId = req.user!.id;
        const user = await User.findByPk(userId, {
            attributes: ['id', 'visibleName', 'username'],
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
