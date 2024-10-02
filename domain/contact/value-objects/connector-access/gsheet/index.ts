import { RequiredInformationError } from "@domain/contact/errors/required-information-error";
import { ConnectorAccess } from "@domain/contact/value-objects/connector-access";

export class GsheetAccess extends ConnectorAccess {
    constructor(
        readonly accountEmail: string,
        readonly privateKey: string,
    ) {
        super();
        this.validate();
    }

    protected validate() {
        if (this.accountEmail.trim().length === 0) {
            throw new RequiredInformationError('connector.gsheet.accountEmail');
        }

        if (this.privateKey.trim().length === 0) {
            throw new RequiredInformationError('connector.gsheet.privateKey');
        }
    }
}