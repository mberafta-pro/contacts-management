import { RequiredInformationError } from "@domain/contact/errors/required-information-error";
import { ConnectorAccess } from "@domain/contact/value-objects/connector-access";

export class HubspotConnectorAccess extends ConnectorAccess {
    constructor(readonly apiKey: string) {
        super();
        this.validate();
    }

    protected validate(): void {
        if (this.apiKey.trim().length === 0) {
            throw new RequiredInformationError('connector.apiKey');
        }
    }
}