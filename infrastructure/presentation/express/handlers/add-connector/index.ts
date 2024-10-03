import { AddConnectorUsecase } from '@domain/contact/api/add-connector';
import { UserOutput } from '@infrastructure/presentation/express/presenters/find-user-presenter';
import { NextFunction, Request, Response } from 'express';

type AddConnectorRequestBody = {
  source: string;
  params: Record<string, string | number>;
};

type AddConnectorRequest = Request<object, AddConnectorRequestBody>;

export const addConnectorHandler =
  (usecase: AddConnectorUsecase) =>
  async (request: AddConnectorRequest, response: Response, next: NextFunction) => {
    try {
      await usecase.handle({
        ownerId: (request.user! as UserOutput).id,
        ...request.body,
      });
      response.status(201).end();
    } catch (error) {
      next({ error });
    }
  };
