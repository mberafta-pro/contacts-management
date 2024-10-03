import { SynchronizeContactsUsecase } from '@domain/contact/api/synchronize-contacts';
import { NextFunction, Request, Response } from 'express';

type SynchronizeContactsRequestParams = { connectorId: string };
type SynchronizeContactsRequest = Request<SynchronizeContactsRequestParams>;

export const synchronizeContactsHandler =
  (usecase: SynchronizeContactsUsecase) =>
  async (request: SynchronizeContactsRequest, response: Response, next: NextFunction) => {
    try {
      await usecase.handle({
        connectorId: request.params.connectorId,
      });

      response.status(200).end();
    } catch (error) {
      next({ error });
    }
  };
