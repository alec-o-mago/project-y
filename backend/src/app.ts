import express from 'express';
import cors from 'cors'
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import postRoutes from './routes/postRoutes';
import setupSwagger from './swagger';
import './models';

const app = express();

app.use(cors())
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/posts', postRoutes);

setupSwagger(app);

export default app;
