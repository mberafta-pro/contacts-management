import { RequiredInformationError } from '@domain/contact/errors/required-information-error';
import { ValueObject } from '@domain/value-object';

export type IdentityInputDto = {
  firstName: string;
  lastName: string;
};

export class Identity implements ValueObject<Identity> {
  private constructor(
    readonly firstName: string,
    readonly lastName: string
  ) {}

  equals(other?: Identity | undefined): boolean {
    if (!other) return false;

    const assertions = [this.firstName === other.firstName, this.lastName === other.lastName];

    return assertions.every(Boolean);
  }

  public static from(input: IdentityInputDto) {
    if (input.firstName.trim().length === 0) {
      throw new RequiredInformationError('contact.firstName');
    }

    if (input.lastName.trim().length === 0) {
      throw new RequiredInformationError('contact.lastName');
    }

    return new Identity(input.firstName, input.lastName);
  }
}
