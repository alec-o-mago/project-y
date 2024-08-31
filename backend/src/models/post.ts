import { DataTypes, Model, HasMany } from 'sequelize';
import sequelize from '../config/db';
import { User } from './user';

export class Post extends Model {
    public id!: number;
    public content!: string;
    public userId!: number;
    public createdAt!: Date;
    public readonly user?: User;
}

Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: User,
                key: 'id',
            },
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,
        modelName: 'Post',
    }
);
