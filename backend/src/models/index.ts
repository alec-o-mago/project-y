import sequelize from '../config/db';
import { User } from './user';
import { Post } from './post';

Post.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user',
});

User.hasMany(Post, {
    foreignKey: 'userId',
    as: 'posts',
});


sequelize.sync();

export {
    User,
    Post,
    sequelize
};

