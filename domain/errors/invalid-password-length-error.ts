import { DomainError } from "@domain/errors";

export class InvalidPasswordLengthError extends DomainError {
    constructor() {
        super('invalid.password.length.error', {});
    }
}