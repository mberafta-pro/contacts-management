import sequelize from '@infrastructure/persistence/postgres/sequelize';
import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';

interface User {
    id: string;
    firstName: string;
    lastName: string;
    password: string;
    email:string;
};

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare id: string;
    declare firstName: string;
    declare lastName: string;
    declare password: string;
    declare email: string;
    declare readonly createdAt: CreationOptional<Date>;
    declare readonly updatedAt: CreationOptional<Date>;
}

User.init(
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
        },
        updatedAt : {
            type: DataTypes.DATE,
        }
    },
    { sequelize, tableName: 'users', timestamps:true }
);

export default User;