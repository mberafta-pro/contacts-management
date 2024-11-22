import { Contact } from '@domain/contact/entities';
import { Connector, ConnectorSource } from '@domain/contact/entities/connector';
import { ContactSynchronizationClient } from '@domain/contact/spi/contact-synchronization-client';
import { HubspotConnectorAccess } from '@domain/contact/value-objects/connector-access/hubspot';
import { HttpClient } from '@infrastructure/external/httpclient';
import { v4 } from 'uuid';

interface ContactsResponseDto {
  results: {
    id: string;
    properties: {
      firstname: string;
      lastname: string;
      email: string;
      phone: string;
      mobilephone: string;
    };
  }[];
}

interface PropertiesResponseDto {
  results: { name: string; groupName: string }[];
}

const ENDPOINTS = {
  contacts: 'https://api.hubapi.com/crm/v3/objects/contacts',
  properties: 'https://api.hubapi.com/crm/v3/properties/contacts',
};

export class HubspotContactClient implements ContactSynchronizationClient {
  constructor(private readonly httpClient: HttpClient) {}

  private async getProperties(): Promise<string[]> {
    const { response } = await this.httpClient.get<PropertiesResponseDto>(ENDPOINTS.properties, {});
    return response.results
      .filter(
        ({ groupName, name }) => groupName === 'contactinformation' && name.match(/hs/i) == null
      )
      .map(({ name }) => name);
  }

  async synchronize(connector: Connector): Promise<Contact[]> {
    const access = connector.access as HubspotConnectorAccess;
    this.httpClient.addBearerToken(access.apiKey);

    const properties = await this.getProperties();
    const { response } = await this.httpClient.get<ContactsResponseDto>(ENDPOINTS.contacts, {
      properties: properties.join(','),
    });

    return response.results
      .map((contact) => {
        try {
          return Contact.from({
            id: v4(),
            ownerId: connector.ownerId,
            firstName: contact.properties.firstname,
            lastName: contact.properties.lastname,
            email: contact.properties.email,
            source: ConnectorSource.HUBSPOT,
            externalId: contact.id,
            phoneNumber: contact.properties.phone ?? contact.properties.mobilephone,
          });
        } catch {
          console.log('Invalid contact from Hubspot', JSON.stringify({ contact }, null, 2));
          return null;
        }
      })
      .filter((contact) => contact != null);
  }
}
