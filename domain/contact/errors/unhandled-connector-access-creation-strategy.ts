import { ConnectorSource } from "@domain/contact/entities/connector";
import { DomainError } from "@domain/shared-kernel/domain-error";

type UnhandledConnectorAccessCreationStrategyContext = {
    source: string;
};

export class UnhandledConnectorAccessCreationStrategyError
    extends DomainError<UnhandledConnectorAccessCreationStrategyContext> {
    constructor(source: ConnectorSource) {
        super(
            'unhandled.connector.access.creation.strategy.error',
            { source }
        );
    }
}