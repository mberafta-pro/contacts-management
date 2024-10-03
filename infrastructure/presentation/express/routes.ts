import {
  CONNECTORS_CONTROLLER_TYPE,
  CONNECTORS_PATH,
  ConnectorsController,
} from '@infrastructure/presentation/express/controllers/connector-controller';
import {
  CONTACTS_CONTROLLER_TYPE,
  CONTACTS_PATH,
  ContactsController,
} from '@infrastructure/presentation/express/controllers/contact-controller';
import {
  USERS_CONTROLLER_TYPE,
  USERS_PATH,
  UsersController,
} from '@infrastructure/presentation/express/controllers/user-controller';
import { authentication } from '@infrastructure/presentation/express/middlewares/authentication';
import { container } from '@ioc/inversify';
import { Router } from 'express';

const router = Router();

router.use(USERS_PATH, container.get<UsersController>(USERS_CONTROLLER_TYPE).router);
router.use(authentication);
router.use(CONTACTS_PATH, container.get<ContactsController>(CONTACTS_CONTROLLER_TYPE).router);
router.use(CONNECTORS_PATH, container.get<ConnectorsController>(CONNECTORS_CONTROLLER_TYPE).router);

export default router;
