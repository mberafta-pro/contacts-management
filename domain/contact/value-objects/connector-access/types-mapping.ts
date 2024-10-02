import { ConnectorSource } from "@domain/contact/entities/connector"
import { GsheetAccess } from "@domain/contact/value-objects/connector-access/gsheet"
import { HubspotConnectorAccess } from "@domain/contact/value-objects/connector-access/hubspot"

export type TypesMapping = {
    [ConnectorSource.HUBSPOT]: HubspotConnectorAccess,
    [ConnectorSource.GSHEET]: GsheetAccess,
}