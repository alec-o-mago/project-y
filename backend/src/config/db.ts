import 'dotenv/config'
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
    `postgres://${process.env.POSTGRES_USERNAME}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOSTNAME}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DATABASE}`, 
    {dialect: 'postgres',}
);

export default sequelize;
