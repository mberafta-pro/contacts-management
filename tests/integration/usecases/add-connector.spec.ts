import sequelize from '@infrastructure/persistence/postgres/sequelize';
import ConnectorModel from '@infrastructure/persistence/postgres/models/connector';
import UserModel from '@infrastructure/persistence/postgres/models/user';
import {
  PasswordService,
  PASSWORD_SERVICE_TYPE,
} from '@domain/user-account/services/password-service';
import { UserRepository, USER_REPOSITORY_TYPE } from '@domain/user-account/spi/user-repository';
import { container } from '@ioc/inversify';
import { ConnectorSource } from '@domain/contact/entities/connector';
import {
  AddConnectorCommand,
  AddConnectorUsecase,
  ADD_CONNECTOR_USECASE_TYPE,
} from '@domain/contact/api/add-connector';

describe('Integration - Usecases - Add connector tests', () => {
  beforeAll(async () => {
    await sequelize.authenticate();
    await UserModel.destroy({ where: {}, truncate: true });
    await ConnectorModel.destroy({ where: {}, truncate: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  describe('GIVEN Jane doe has been created', () => {
    describe(`WHEN I Ask for adding a new connector from a valid source, with access params`, () => {
      it('THEN Connector will be created, with encrypted params', async () => {
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

        await UserModel.create(userCreationInput);

        const command: AddConnectorCommand = {
          ownerId: userCreationInput.id,
          source: ConnectorSource.HUBSPOT,
          params: { apiKey: 'TEST_API_KEY' },
        };

        const usecase = container.get<AddConnectorUsecase>(ADD_CONNECTOR_USECASE_TYPE);
        await usecase.handle(command);

        const connectors = await ConnectorModel.findAll();
        expect(connectors).toHaveLength(1);
        expect(connectors[0].access).toEqual({ apiKey: btoa('TEST_API_KEY') });
      });
    });
  });
});
