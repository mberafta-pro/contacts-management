import { ValueObject } from '@domain/shared-kernel/value-object';

export class Password implements ValueObject<Password> {
  readonly hash: string;
  readonly salt: string;

  private constructor(hash: string, salt: string) {
    this.hash = hash;
    this.salt = salt;
  }

  static from(hash: string, salt: string) {
    return new Password(hash, salt);
  }

  equals: (other?: Password | undefined) => boolean = (other) => {
    if (!other) return false;
    return this.hash === other.hash && this.salt === other.salt;
  };

  static readonly empty = new Password('', '');
}
