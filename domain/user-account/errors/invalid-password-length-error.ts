import { DomainError } from '@domain/shared-kernel/domain-error';

export class InvalidPasswordLengthError extends DomainError {
  constructor() {
    super('invalid.password.length.error', {});
  }
}
