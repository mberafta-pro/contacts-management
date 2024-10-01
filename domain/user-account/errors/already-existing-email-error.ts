import { DomainError } from '@domain/shared-kernel/domain-error';

type AlreadyExistingEmailContext = { email: string };

export class AlreadyExistingEmailError extends DomainError<AlreadyExistingEmailContext> {
  constructor(email: string) {
    super('already.existing.email.error', { email });
  }
}
