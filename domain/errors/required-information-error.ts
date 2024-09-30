import { DomainError } from "@domain/errors";

type RequiredInformationContext = {
    path: string;
};

export class RequiredInformationError extends DomainError<RequiredInformationContext> {
    constructor(path: string) {
        super('required.information.error',{ path })
    }
}