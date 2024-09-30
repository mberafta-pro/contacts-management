import sequelize from "@infrastructure/persistence/postgres/sequelize";
import User from "@infrastructure/persistence/postgres/models/user";

describe('Integration - Postgres - User tests', () => {
    beforeAll(async () => {
        await sequelize.authenticate();
        await sequelize.sync({ force: true });
    });

    afterEach(async () => {
        await User.destroy({ where: {}, truncate: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it('Should insert a new user when required fields are provided', async () => {
        await User.create({
            firstName: 'John',
            lastName: 'Doe',
            password: 'XXXXXX',
            id: 'user-01',
            email : 'john.doe@test.com'
        });

        const storedUsers = await User.findAll();
        expect(storedUsers).toHaveLength(1);
    });
});