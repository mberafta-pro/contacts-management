import { Connector, ConnectorSource } from "@domain/contact/entities/connector";
import { InvalidConnectorSourceError } from "@domain/contact/errors/invalid-connector-source-error";
import { RequiredInformationError } from "@domain/contact/errors/required-information-error";
import { HubspotConnectorAccess } from "@domain/contact/value-objects/connector-access/hubspot";

describe('DOMAIN - Contact - Connector tests', () => {
    describe('GIVEN I Provide an input to create a connector', () => {
        const defaultInput = {
            id: 'connector-id',
            source: ConnectorSource.GSHEET,
            ownerId: 'owner-id',
            accessInformations: {},
        };

        describe('WHEN Input id is empty', () => {
            it('THEN A Required information error should be raised', () => {
                expect(() => Connector.from({ ...defaultInput, id: '' })).toThrow(RequiredInformationError);
            });
        });

        describe('WHEN Input owner id is empty', () => {
            it('THEN A Required information error should be raised', () => {
                expect(() => Connector.from({ ...defaultInput, ownerId: '' })).toThrow(RequiredInformationError);
            });
        });


        describe('WHEN Input source is empty', () => {
            it('THEN A Required information error should be raised', () => {
                expect(() => Connector.from({ ...defaultInput, source: '' })).toThrow(RequiredInformationError);
            });
        });

        describe('WHEN Input source is not handled', () => {
            it('THEN An Invalid connector source error should be raised', () => {
                expect(() => Connector.from({ ...defaultInput, source: 'not_allowed' })).toThrow(InvalidConnectorSourceError);
            });
        });

        describe('WHEN Input source informations are valid', () => {
            it('THEN A Connector should be created, AND it connection access infos should be an instance related to the source', () => {
                const connector = Connector.from({
                    ...defaultInput,
                    source: ConnectorSource.HUBSPOT,
                    accessInformations: {
                        apiKey: 'some_api_key'
                    },
                });

                expect(connector.id).toBe(defaultInput.id);
                expect(connector.ownerId).toBe(defaultInput.ownerId);
                expect(connector.source).toBe(ConnectorSource.HUBSPOT);
                expect(connector.access).toBeInstanceOf(HubspotConnectorAccess);
                expect((connector.access as HubspotConnectorAccess).apiKey).toBe('some_api_key');
            });
        });
    });
});