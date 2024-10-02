import { ConnectorSource } from "@domain/contact/entities/connector";
import { ConnectorAccessCreationStrategy } from "@domain/contact/value-objects/connector-access/creation-strategy";
import { HubspotConnectorAccess } from "@domain/contact/value-objects/connector-access/hubspot";

export class HubspotAccessCreationStrategy implements ConnectorAccessCreationStrategy<ConnectorSource.HUBSPOT> {
    canHandle(source: ConnectorSource): boolean {
        return source === ConnectorSource.HUBSPOT;
    }

    create(input: Record<string, string | number>): HubspotConnectorAccess {
        return new HubspotConnectorAccess(input.apiKey?.toString() ?? '');
    }
}