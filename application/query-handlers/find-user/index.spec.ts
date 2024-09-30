import { FindUserQuery } from "@application/queries/find-user-query";
import { FIND_USER_TYPE, FindUser } from "@application/query-handlers/find-user";
import userModel from '@infrastructure/persistence/postgres/models/user';
import sequelize from "@infrastructure/persistence/postgres/sequelize";
import { FindUserPresenter } from "@infrastructure/presentation/express/presenters/find-user-presenter";
import { container } from "@ioc/inversify";

describe('Usecase - Find user tests', () => {
    beforeAll(async () => {
        await sequelize.authenticate();
        await userModel.destroy({ where: {}, truncate: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    describe('GIVEN John Doe user has been created', () => {
        describe('WHEN Asking John Doe by its email, providing a presenter', () => {
            it('THEN John Doe should be retrieved, with informations asked by presenter', async () => {
                const presenter = new FindUserPresenter();
                const userCreationInput = {
                    id: 'user-01',
                    firstName: 'John',
                    lastName: 'Doe',
                    email: 'john.doe@test.com',
                    password: 'xxxxxx'
                };

                await userModel.create(userCreationInput);

                const query: FindUserQuery = { email: 'john.doe@test.com' };
                const usecase = container.get<FindUser>(FIND_USER_TYPE);

                await usecase.handle(presenter, query);

                expect(presenter.presented).toEqual({
                    id: userCreationInput.id,
                    firstName: userCreationInput.firstName,
                    lastName: userCreationInput.lastName,
                });
            });
        });
    });
});