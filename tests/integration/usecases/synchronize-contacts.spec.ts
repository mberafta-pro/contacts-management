import { SynchronizeContacts } from '@application/command-handlers/synchronize-contacts';
import { SynchronizeContactsCommand } from '@domain/contact/api/synchronize-contacts';
import { Connector, ConnectorSource } from '@domain/contact/entities/connector';
import {
  CONNECTOR_ACCESS_ENCRYPTER_TYPE,
  ConnectorAccessEncrypter,
} from '@domain/contact/services/connector-access-encrypter';
import {
  CONNECTOR_REPOSITORY_TYPE,
  ConnectorRepository,
} from '@domain/contact/spi/connector-repository';
import { CONTACT_REPOSITORY_TYPE, ContactRepository } from '@domain/contact/spi/contact-repository';
import { User } from '@domain/user-account/entities/user';
import { USER_REPOSITORY_TYPE, UserRepository } from '@domain/user-account/spi/user-repository';
import { Arg, Substitute } from '@fluffy-spoon/substitute';
import { ExternalContactClientFactory } from '@infrastructure/external/adapters/external-contact-client-factory';
import { HttpClient } from '@infrastructure/external/httpclient';
import ConnectorModel from '@infrastructure/persistence/postgres/models/connector';
import ContactModel from '@infrastructure/persistence/postgres/models/contact';
import UserModel from '@infrastructure/persistence/postgres/models/user';
import sequelize from '@infrastructure/persistence/postgres/sequelize';
import { container } from '@ioc/inversify';

describe('Integration - Usecases - Synchronize contacts tests', () => {
  beforeAll(async () => {
    try {
      await sequelize.authenticate();
      await UserModel.destroy({ where: {}, truncate: true });
      await ContactModel.destroy({ where: {}, truncate: true });
      await ConnectorModel.destroy({ where: {}, truncate: true });
    } catch (error) {
      console.log({ error });
    }
  });

  afterAll(async () => {
    await sequelize.close();
  });

  describe('GIVEN Jane Doe has a Hubspot connector', () => {
    describe('WHEN Asking for Hubspot contacts', () => {
      it('THEN Contacts will be created from valid Hubspot contacts', async () => {
        const userRepository = container.get<UserRepository>(USER_REPOSITORY_TYPE);
        const contactRepository = container.get<ContactRepository>(CONTACT_REPOSITORY_TYPE);
        const connectorRepository = container.get<ConnectorRepository>(CONNECTOR_REPOSITORY_TYPE);
        const encrypter = container.get<ConnectorAccessEncrypter>(CONNECTOR_ACCESS_ENCRYPTER_TYPE);

        const janeDoe = User.from({
          id: userRepository.newId(),
          firstName: 'Jane',
          lastName: 'Doe',
          email: 'jane.doe@test.com',
        });

        const hubspotConnector = Connector.from({
          id: connectorRepository.newId(),
          source: ConnectorSource.HUBSPOT,
          ownerId: janeDoe.id,
          accessInformations: { apiKey: 'TEST_API_KEY' },
        });

        await userRepository.create(janeDoe);
        await connectorRepository.create(hubspotConnector.encryptWith(encrypter));

        const httpClient = Substitute.for<HttpClient>();
        httpClient
          .get(
            Arg.is((x) => RegExp(/properties/i).exec(x) != null),
            Arg.any()
          )
          .resolves({
            response: { results: [] },
            error: null,
            status: 200,
          });

        httpClient
          .get(
            Arg.is((x) => RegExp(/contacts/i).exec(x) != null),
            Arg.any()
          )
          .resolves({
            response: {
              results: [
                {
                  id: 'hs-01',
                  properties: {
                    firstname: 'Aria',
                    lastname: 'Stark',
                    email: 'aria.stark@hotmail.fr',
                    phone: '0601020304',
                  },
                },
              ],
            },
            status: 200,
            error: null,
          });

        const contactClientFactory = new ExternalContactClientFactory(httpClient);

        const usecase = new SynchronizeContacts(
          contactClientFactory,
          connectorRepository,
          contactRepository,
          encrypter
        );
        const command: SynchronizeContactsCommand = {
          connectorId: hubspotConnector.id,
        };

        await usecase.handle(command);

        const insertedContacts = await contactRepository.getAll(hubspotConnector.ownerId, 0, 10);
        expect(insertedContacts).toHaveLength(1);
        expect(insertedContacts[0].externalId).toBe('hs-01');
        expect(insertedContacts[0].ownerId).toBe(hubspotConnector.ownerId);
        expect(insertedContacts[0].identity.firstName).toBe('Aria');
        expect(insertedContacts[0].identity.lastName).toBe('Stark');
        expect(insertedContacts[0].reachabilityInformations.phoneNumber).toBe('0601020304');
        expect(insertedContacts[0].reachabilityInformations.email).toBe('aria.stark@hotmail.fr');
      });
    });
  });
});
