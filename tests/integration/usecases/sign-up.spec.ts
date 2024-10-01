import sequelize from '@infrastructure/persistence/postgres/sequelize';
import userModel from '@infrastructure/persistence/postgres/models/user';
import { container } from '@ioc/inversify';
import {
  PasswordService,
  PASSWORD_SERVICE_TYPE,
} from '@domain/user-account/services/password-service';
import { AlreadyExistingEmailError } from '@domain/user-account/errors/already-existing-email-error';
import { SIGNUP_USECASE_TYPE, SignupCommand } from '@domain/user-account/api/signup-usecase';
import { Signup } from '@application/command-handlers/signup';

describe('Integration - Usecases - Signup tests', () => {
  beforeAll(async () => {
    await sequelize.authenticate();
    await userModel.destroy({ where: {}, truncate: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  describe('GIVEN I Provide first name, last name, email and password', () => {
    describe('WHEN Provided informations are valid AND email does not already exist', () => {
      it('THEN A New user should be created, with an encrypted password (hash/salt)', async () => {
        const command: SignupCommand = {
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@test.com',
          password: 'xxxxxx',
        };

        const usecase = container.get<Signup>(SIGNUP_USECASE_TYPE);
        await usecase.handle(command);

        const storedUser = await userModel.findOne({ where: { email: command.email } });
        expect(storedUser).not.toBeNull();
        expect(storedUser?.firstName).toBe(command.firstName);
        expect(storedUser?.lastName).toBe(command.lastName);
        expect(storedUser?.email).toBe(command.email);
        expect(storedUser?.passwordHash).not.toBe('');
        expect(storedUser?.passwordSalt).not.toBe('');
      });
    });

    describe('WHEN Provided informations are valid AND email does already exist', () => {
      it('THEN An Already existing email error should be raised', async () => {
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

        const command: SignupCommand = {
          firstName: 'Jane',
          lastName: 'Doe',
          email: userCreationInput.email,
          password: 'xxxxxx',
        };

        const usecase = container.get<Signup>(SIGNUP_USECASE_TYPE);

        const task = async () => {
          await usecase.handle(command);
        };

        await expect(task).rejects.toThrow(AlreadyExistingEmailError);
      });
    });
  });
});
