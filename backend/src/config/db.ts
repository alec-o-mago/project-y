import 'dotenv/config'
import { Sequelize } from 'sequelize';
import pg from 'pg';

const sequelize = new Sequelize(
    process.env.POSTGRES_URL ?? 'postgres://postgres:postgres@$localhost:5432/postgres',
    {
        dialect: 'postgres',
        dialectModule: pg,
    }
);

export default sequelize;
