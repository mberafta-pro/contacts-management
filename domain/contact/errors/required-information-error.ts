import { DomainError } from '@domain/shared-kernel/domain-error';

type RequiredInformationContext = {
  path: string;
};

export class RequiredInformationError extends DomainError<RequiredInformationContext> {
  constructor(path: string) {
    super('required.information.error', { path });
  }
}
