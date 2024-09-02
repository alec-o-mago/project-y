import 'dotenv/config'
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
    process.env.POSTGRES_URL ?? 'postgres://postgres:postgres@$localhost:5432/postgres',
    {dialect: 'postgres',}
);

export default sequelize;
