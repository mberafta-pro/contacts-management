import { Contact } from '@domain/contact/entities';
import { RequiredInformationError } from '@domain/contact/errors/required-information-error';

describe('DOMAIN - Contact - Contact tests', () => {
  describe('GIVEN I Provide an input to create a contact', () => {
    describe('WHEN Id is empty', () => {
      it('THEN A Required information error should be raised', () => {
        const input = {
          id: '',
          ownerId: 'owner-id',
          source: 'HUBSPOT',
          externalId: 'crm-id-01',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@test.com',
          phoneNumber: '+33601010101',
        };

        expect(() => Contact.from(input)).toThrow(RequiredInformationError);
      });
    });

    describe('WHEN Owner Id is empty', () => {
      it('THEN A Required information error should be raised', () => {
        const input = {
          id: 'id',
          ownerId: '',
          source: 'HUBSPOT',
          externalId: 'crm-id',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@test.com',
          phoneNumber: '+33601010101',
        };

        expect(() => Contact.from(input)).toThrow(RequiredInformationError);
      });
    });

    describe('WHEN External Id is empty', () => {
      it('THEN A Required information error should be raised', () => {
        const input = {
          id: 'id',
          ownerId: 'owner-id',
          source: 'HUBSPOT',
          externalId: '',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@test.com',
          phoneNumber: '+33601010101',
        };

        expect(() => Contact.from(input)).toThrow(RequiredInformationError);
      });
    });

    describe('WHEN Source is empty', () => {
      it('THEN A Required information error should be raised', () => {
        const input = {
          id: 'id',
          ownerId: 'owner-id',
          source: 'HUBSPOT',
          externalId: '',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@test.com',
          phoneNumber: '+33601010101',
        };

        expect(() => Contact.from(input)).toThrow(RequiredInformationError);
      });
    });

    describe('WHEN First name is empty', () => {
      it('THEN A Required information error should be raised', () => {
        const input = {
          id: 'user-id',
          ownerId: 'owner-id',
          source: 'HUBSPOT',
          externalId: 'crm-id-01',
          firstName: '',
          lastName: 'Doe',
          email: 'john.doe@test.com',
          phoneNumber: '+33601010101',
        };

        expect(() => Contact.from(input)).toThrow(RequiredInformationError);
      });
    });

    describe('WHEN Last name is empty', () => {
      it('THEN A Required information error should be raised', () => {
        const input = {
          id: 'user-id',
          ownerId: 'owner-id',
          source: 'HUBSPOT',
          externalId: 'crm-id-01',
          firstName: 'John',
          lastName: '',
          email: 'john.doe@test.com',
          phoneNumber: '+33601010101',
        };

        expect(() => Contact.from(input)).toThrow(RequiredInformationError);
      });
    });

    describe('WHEN email is empty', () => {
      it('THEN A Required information error should be raised', () => {
        const input = {
          id: 'user-id',
          ownerId: 'owner-id',
          source: 'HUBSPOT',
          externalId: 'crm-id-01',
          firstName: 'John',
          lastName: 'Doe',
          email: '',
          phoneNumber: '+33601010101',
        };

        expect(() => Contact.from(input)).toThrow(RequiredInformationError);
      });
    });

    describe('WHEN phone number is empty', () => {
      it('THEN A Required information error should be raised', () => {
        const input = {
          id: 'user-id',
          ownerId: 'owner-id',
          source: 'HUBSPOT',
          externalId: 'crm-id-01',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@test.com',
          phoneNumber: '',
        };

        expect(() => Contact.from(input)).toThrow(RequiredInformationError);
      });
    });

    describe('WHEN Input informations are valid', () => {
      it('THEN A Contact should be created', () => {
        const input = {
          id: 'user-id',
          ownerId: 'owner-id',
          source: 'HUBSPOT',
          externalId: 'crm-id-01',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@test.com',
          phoneNumber: '+330601010101',
        };

        const contact = Contact.from(input);

        expect(contact.id).toBe(input.id);
        expect(contact.externalId).toBe(input.externalId);
        expect(contact.source).toBe(input.source);
        expect(contact.identity.firstName).toBe(input.firstName);
        expect(contact.identity.lastName).toBe(input.lastName);
        expect(contact.reachabilityInformations.email).toBe(input.email);
        expect(contact.reachabilityInformations.phoneNumber).toBe(input.phoneNumber);
      });
    });
  });
});
