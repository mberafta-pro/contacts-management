import { InvalidPasswordLengthError } from "@domain/errors/invalid-password-length-error";
import { RequiredInformationError } from "@domain/errors/required-information-error";
import { User } from "@domain/user-account/user";

describe('DOMAIN - User account > User tests', () => {
    describe('GIVEN I provide an input to create a new user', () => {
        describe('WHEN Id is empty', () => {
            it('THEN A Required information error should be raised', () => {
                const input = { id: '', firstName: 'John', lastName: 'Doe', password:'XXXXX' };
                expect(() => User.from(input)).toThrow(RequiredInformationError);
            });
        });

        describe('WHEN First name is empty', () => {
            it('THEN A Required information error should be raised', () => {
                const input = { id: 'user-01', firstName: '', lastName: 'Doe', password:'XXXXX' };
                expect(() => User.from(input)).toThrow(RequiredInformationError);
            });
        });

        describe('WHEN Last name is empty', () => {
            it('THEN A Required information error should be raised', () => {
                const input = { id: 'user-01', firstName: 'John', lastName: '', password:'XXXXX' };
                expect(() => User.from(input)).toThrow(RequiredInformationError);
            });
        });

        describe('WHEN Password is empty', () => {
            it('THEN A Required information error should be raised', () => {
                const input = { id: 'user-01', firstName: 'John', lastName: 'Doe', password:'' };
                expect(() => User.from(input)).toThrow(RequiredInformationError);
            });
        });

        describe('WHEN Password length is lower than 3', () => {
            it('THEN An Invalid password length error should be raised', () => {
                const input = { id: 'user-01', firstName: 'John', lastName: 'Doe', password:'XX' };
                expect(() => User.from(input)).toThrow(InvalidPasswordLengthError);
            });
        });

        describe('WHEN Input informations are all valid', () => {
            it('THEN A User should be created', () => {
                const input = { id: 'user-01', firstName: 'John', lastName: 'Doe', password:'XXXXXX' };
                const user = User.from(input);
                expect(user.id).toBe(input.id);
                expect(user.firstName).toBe(input.firstName);
                expect(user.lastName).toBe(input.lastName);
                expect(user.password).toBe(input.password);
            });
        });
    });
});