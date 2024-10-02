import { PasswordService } from '@domain/user-account/services/password-service';
import { QueryInterface } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    const passwordService = new PasswordService();
    const password = await passwordService.generateFrom('test1234');
    return queryInterface.bulkInsert('users', [
      {
        firstName: 'Janet',
        lastName: 'Doe',
        email: 'example@example.com',
        passwordHash: password.hash,
        passwordSalt: password.salt,
      },
    ]);
  },
  down: (queryInterface: QueryInterface) => {
    return queryInterface.bulkDelete('Users', {});
  },
};
