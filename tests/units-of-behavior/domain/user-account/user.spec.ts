import { User } from '@domain/user-account/entities/user';
import { RequiredInformationError } from '@domain/user-account/errors/required-information-error';
import { Password } from '@domain/user-account/value-objects/password';

describe('DOMAIN - User account - User tests', () => {
  describe('GIVEN I provide an input to create a new user', () => {
    describe('WHEN Id is empty', () => {
      it('THEN A Required information error should be raised', () => {
        const input = {
          id: '',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@test.com',
        };

        expect(() => User.from(input)).toThrow(RequiredInformationError);
      });
    });

    describe('WHEN First name is empty', () => {
      it('THEN A Required information error should be raised', () => {
        const input = {
          id: 'user-id',
          firstName: '',
          lastName: 'Doe',
          email: 'john.doe@test.com',
        };

        expect(() => User.from(input)).toThrow(RequiredInformationError);
      });
    });

    describe('WHEN Last name is empty', () => {
      it('THEN A Required information error should be raised', () => {
        const input = {
          id: 'user-id',
          firstName: 'John',
          lastName: '',
          email: 'john.doe@test.com',
        };

        expect(() => User.from(input)).toThrow(RequiredInformationError);
      });
    });

    describe('WHEN email is empty', () => {
      it('THEN A Required information error should be raised', () => {
        const input = {
          id: 'user-id',
          firstName: 'John',
          lastName: 'Doe',
          email: '',
        };

        expect(() => User.from(input)).toThrow(RequiredInformationError);
      });
    });

    describe('WHEN Input informations are all valid', () => {
      it('THEN A User should be created, with an empty password', () => {
        const input = {
          id: 'user-id',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@test.com',
        };

        const user = User.from(input);
        expect(user.id).toBe(input.id);
        expect(user.firstName).toBe(input.firstName);
        expect(user.lastName).toBe(input.lastName);
        expect(user.email).toBe(input.email);
        expect(user.password.equals(Password.empty)).toBeTruthy();
      });
    });
  });
});
