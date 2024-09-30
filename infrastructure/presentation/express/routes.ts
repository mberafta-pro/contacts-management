import { USERS_CONTROLLER_TYPE, USERS_PATH, UsersController } from "@infrastructure/presentation/express/controllers/user-controller";
import { container } from "@ioc/inversify";
import { Router } from "express";

const router = Router();

router.use(USERS_PATH, container.get<UsersController>(USERS_CONTROLLER_TYPE).router);

export default router;