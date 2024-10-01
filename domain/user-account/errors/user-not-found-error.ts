import { DomainError } from '@domain/shared-kernel/domain-error';

type UserNotFoundContext = { email: string };

export class UserNotFoundError extends DomainError<UserNotFoundContext> {
  constructor(email: string) {
    super('user.not.found.error', { email });
  }
}
