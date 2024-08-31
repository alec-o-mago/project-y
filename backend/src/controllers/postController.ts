import { Request, Response } from 'express';
import { Post, User } from '../models';

export const createPost = async (req: Request, res: Response) => {
    const { content } = req.body;
    try {
        const post = await Post.create({ content, userId: req?.user?.id });
        res.status(201).json(post);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
};

export const updatePost = async (req: Request, res: Response) => {
    try {
        const postId = req.params.id;
        const { content } = req.body;

        const post = await Post.findByPk(postId);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        if (req.user!.id !== post.userId) {
            return res.status(403).json({ message: 'Forbidden' });
        }

        if (content) {
            post.content = content;
        }

        await post.save();

        res.json(post);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};


export const deletePost = async (req: Request, res: Response) => {
    try {
        const post = await Post.findOne({ where: { id: req.params.id, userId: req?.user?.id } });
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        await post.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
};

export const getLast100Posts = async (req: Request, res: Response) => {
    try {
        const posts = await Post.findAll({
            where: { userId: req?.user?.id },
            order: [['createdAt', 'DESC']],
            limit: 100,
        });
        res.json(posts);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
};

export const getRecentPosts = async (req: Request, res: Response) => {
    try {
        const recentPosts = await Post.findAll({
            limit: 100,
            order: [['createdAt', 'DESC']],
            include: [
                {
                    model: User,
                    attributes: ['id', 'visibleName', 'username'], // Exclude the password field
                    as: 'user',
                },
            ],
        });

        console.log(recentPosts)
        res.json(recentPosts);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server error', error });
    }
};