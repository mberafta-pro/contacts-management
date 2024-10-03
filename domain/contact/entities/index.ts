import { RequiredInformationError } from '@domain/contact/errors/required-information-error';
import { Identity } from '@domain/contact/value-objects/identity';
import { ReachabilityInformations } from '@domain/contact/value-objects/reachability-informations';
import { Entity } from '@domain/shared-kernel/entity';

export type ContactInputDto = {
  id: string;
  ownerId: string;
  externalId: string;
  source: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
};

export class Contact implements Entity<string> {
  private constructor(
    readonly id: string,
    readonly ownerId: string,
    readonly externalId: string,
    readonly source: string,
    readonly identity: Identity,
    readonly reachabilityInformations: ReachabilityInformations
  ) {}

  public static from(input: ContactInputDto) {
    if (input.id.trim().length === 0) {
      throw new RequiredInformationError('contact.id');
    }

    if (input.ownerId.trim().length === 0) {
      throw new RequiredInformationError('contact.ownerId');
    }

    if (input.externalId.trim().length === 0) {
      throw new RequiredInformationError('contact.externalId');
    }

    if (input.source.trim().length === 0) {
      throw new RequiredInformationError('contact.source');
    }

    const identity = Identity.from({
      firstName: input.firstName,
      lastName: input.lastName,
    });

    const reachabilityInformations = ReachabilityInformations.from({
      email: input.email,
      phoneNumber: input.phoneNumber,
    });

    return new Contact(
      input.id,
      input.ownerId,
      input.externalId,
      input.source,
      identity,
      reachabilityInformations
    );
  }
}
