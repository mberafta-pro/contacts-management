import { DomainError } from "@domain/shared-kernel/domain-error";

type InvalidConnectorSourceContext = { source: string; };

export class InvalidConnectorSourceError extends DomainError<InvalidConnectorSourceContext> {
    constructor(source: string) {
        super(
            'invalid.connector.source.error',
            { source },
        );
    }
}