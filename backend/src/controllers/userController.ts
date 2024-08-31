import { Request, Response } from 'express';
import { User } from '../models';

export const getUser = async (req: Request, res: Response) => {
    const user = await User.findByPk(req?.user?.id);
    res.json(user);
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const userId = req.user!.id;
        const { visibleName } = req.body;

        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (visibleName) {
            user.visibleName = visibleName;
        }

        await user.save();

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};


export const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findByPk(req?.user?.id);
        await user?.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
};
