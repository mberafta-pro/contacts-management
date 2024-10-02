import { InvalidPasswordError } from '@domain/user-account/errors/invalid-password-error';
import { InvalidPasswordLengthError } from '@domain/user-account/errors/invalid-password-length-error';
import { RequiredInformationError } from '@domain/user-account/errors/required-information-error';
import { Password } from '@domain/user-account/value-objects/password';
import { PasswordService } from '@domain/user-account/services/password-service';

describe('DOMAIN - Services - Password service tests', () => {
  const passwordService = new PasswordService();

  describe('GIVEN I provide a password input', () => {
    describe('WHEN Provided password is empty', () => {
      it('THEN A Required error should be raised', async () => {
        const task = async () => await passwordService.generateFrom('');
        await expect(task).rejects.toThrow(RequiredInformationError);
      });
    });

    describe('WHEN Provided password length is lower than 3', () => {
      it('THEN A Required error should be raised', async () => {
        const task = async () => await passwordService.generateFrom('xx');
        await expect(task).rejects.toThrow(InvalidPasswordLengthError);
      });
    });

    describe('WHEN Provided password length is greater or equal than 3', () => {
      it('THEN A hash/salt should be generated', async () => {
        const password = await passwordService.generateFrom('xxxxx');
        expect(password.equals(Password.empty)).toBeFalsy();
      });
    });

    describe('WHEN Comparing to a different password', () => {
      it('THEN An Invalid password error should be raised', async () => {
        const referencePassword = await passwordService.generateFrom('yyyyy');
        const task = async () => await passwordService.verifyPassword('xxxx', referencePassword);
        await expect(task).rejects.toThrow(InvalidPasswordError);
      });
    });
  });
});
