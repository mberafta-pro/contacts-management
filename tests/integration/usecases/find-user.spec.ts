import { Presenter } from '@domain/shared-kernel/presenter';
import {
  FIND_USER_USECASE_TYPE,
  FindUserQuery,
  FindUserUsecase,
} from '@domain/user-account/api/find-user-usecase';
import { USER_REPOSITORY_TYPE, UserRepository } from '@domain/user-account/spi/user-repository';
import {
  PASSWORD_SERVICE_TYPE,
  PasswordService,
} from '@domain/user-account/services/password-service';
import { User } from '@domain/user-account/user';
import userModel from '@infrastructure/persistence/postgres/models/user';
import sequelize from '@infrastructure/persistence/postgres/sequelize';
import { container } from '@ioc/inversify';

class TestPresenter extends Presenter<User, { id: string; email: string }> {
  content?: { id: string; email: string };

  present(domain: User): void {
    this.content = {
      id: domain.id,
      email: domain.email,
    };
  }
}

describe('Integration - Usecases - Find user tests', () => {
  beforeAll(async () => {
    await sequelize.authenticate();
    await userModel.destroy({ where: {}, truncate: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  describe('GIVEN Jane Doe has been created', () => {
    describe('WHEN Asking Jane Doe by its id, providing a presenter', () => {
      it('THEN Informations required by the presenter should be extracted', async () => {
        const passwordService = container.get<PasswordService>(PASSWORD_SERVICE_TYPE);
        const repository = container.get<UserRepository>(USER_REPOSITORY_TYPE);

        const password = await passwordService.generateFrom('xxxxxx');
        const userCreationInput = {
          id: repository.newId(),
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@test.com',
          passwordHash: password.hash,
          passwordSalt: password.salt,
        };

        await userModel.create(userCreationInput);

        const query: FindUserQuery = { id: userCreationInput.id };
        const usecase = container.get<FindUserUsecase>(FIND_USER_USECASE_TYPE);
        const presenter = new TestPresenter();

        await usecase.handle(presenter, query);

        expect(presenter.content?.id).toBe(userCreationInput.id);
        expect(presenter.content?.email).toBe(userCreationInput.email);
      });
    });
  });
});
