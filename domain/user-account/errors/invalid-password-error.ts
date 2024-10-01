import { DomainError } from '@domain/shared-kernel/domain-error';

export class InvalidPasswordError extends DomainError {
  constructor() {
    super('invalid.password.error', {});
  }
}
