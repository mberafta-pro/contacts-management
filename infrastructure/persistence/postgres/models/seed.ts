import userModel from '@infrastructure/persistence/postgres/models/user';
import { v4 } from 'uuid';
import bcrypt from 'bcryptjs';
import sequelize from '@infrastructure/persistence/postgres/sequelize';

export default async () => {
    await sequelize.authenticate();

    await userModel.create({
        id: v4(),
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@test.com',
        password: await bcrypt.hash('password12345', 8)
    });
    
    await sequelize.close();
};