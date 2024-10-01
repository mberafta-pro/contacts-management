import { RequiredInformationError } from '@domain/contact/errors/required-information-error';
import { ValueObject } from '@domain/value-object';

export type ReachabilityInformationsInputDto = {
  email: string;
  phoneNumber: string;
};

export class ReachabilityInformations implements ValueObject<ReachabilityInformations> {
  private constructor(
    readonly email: string,
    readonly phoneNumber: string
  ) {}

  equals(other?: ReachabilityInformations | undefined): boolean {
    if (!other) return false;

    const assertions = [this.email === other.email, this.phoneNumber === other.phoneNumber];

    return assertions.every(Boolean);
  }

  public static from(input: ReachabilityInformationsInputDto) {
    if (input.email.trim().length === 0) {
      throw new RequiredInformationError('contact.email');
    }

    if (input.phoneNumber.trim().length === 0) {
      throw new RequiredInformationError('contact.phoneNumber');
    }

    return new ReachabilityInformations(input.email, input.phoneNumber);
  }
}
