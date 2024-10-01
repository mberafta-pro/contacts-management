import { Login } from '@application/command-handlers/login';
import { LOGIN_USECASE_TYPE, LoginCommand } from '@domain/user-account/api/login-usecase';
import { TOKEN_MANAGER_TYPE, TokenManager } from '@domain/user-account/spi/token-manager';
import {
  PASSWORD_SERVICE_TYPE,
  PasswordService,
} from '@domain/user-account/services/password-service';
import userModel from '@infrastructure/persistence/postgres/models/user';
import sequelize from '@infrastructure/persistence/postgres/sequelize';
import { container } from '@ioc/inversify';

describe('Integration - Usecases - Login tests', () => {
  beforeAll(async () => {
    await sequelize.authenticate();
    await userModel.destroy({ where: {}, truncate: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  describe('GIVEN John Doe user has been created', () => {
    describe('WHEN Providing John Doe email, password', () => {
      it('THEN a token should be created, containing John Doe informations, without password', async () => {
        const tokenManager = container.get<TokenManager>(TOKEN_MANAGER_TYPE);
        const passwordService = container.get<PasswordService>(PASSWORD_SERVICE_TYPE);

        const password = await passwordService.generateFrom('xxxxxx');
        const userCreationInput = {
          id: 'user-01',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@test.com',
          passwordHash: password.hash,
          passwordSalt: password.salt,
        };

        await userModel.create(userCreationInput);

        const command: LoginCommand = {
          email: userCreationInput.email,
          password: 'xxxxxx',
        };

        const usecase = container.get<Login>(LOGIN_USECASE_TYPE);
        const token = await usecase.handle(command);
        const decodedToken = await tokenManager.decode(token);

        expect(decodedToken.email).toBe(userCreationInput.email);
      });
    });
  });
});
