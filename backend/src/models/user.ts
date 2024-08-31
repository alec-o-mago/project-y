import { DataTypes, Model, HasMany } from 'sequelize';
import sequelize from '../config/db';
import { Post } from './post'

export class User extends Model {
    public id!: number;
    public visibleName!: string;
    public username!: string;
    public password!: string;
    public readonly posts?: Post[];
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        visibleName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'User',
    }
);

