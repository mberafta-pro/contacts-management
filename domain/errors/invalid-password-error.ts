import { DomainError } from '@domain/errors';

export class InvalidPasswordError extends DomainError {
  constructor() {
    super('invalid.password.error', {});
  }
}
