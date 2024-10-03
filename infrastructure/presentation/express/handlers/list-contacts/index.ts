import { ListContactsUsecase } from '@domain/contact/api/list-contacts';
import { UserOutput } from '@infrastructure/presentation/express/presenters/find-user-presenter';
import {
  ContactListDto,
  ListContactsPresenter,
} from '@infrastructure/presentation/express/presenters/list-contacts-presenter';
import { NextFunction, Request, RequestHandler, Response } from 'express';

type ListContactsResponse = Response<ContactListDto[]>;

export const listContactsHandler =
  (usecase: ListContactsUsecase): RequestHandler =>
  async (request: Request, response: ListContactsResponse, next: NextFunction) => {
    try {
      const presenter = new ListContactsPresenter();
      await usecase.handle(presenter, {
        ownerId: (request.user as UserOutput).id ?? '',
        page: +(request.query.page ?? 1),
        size: +(request.query.size ?? 20),
      });

      response.status(200).json(presenter.content);
    } catch (error) {
      next({ error });
    }
  };
