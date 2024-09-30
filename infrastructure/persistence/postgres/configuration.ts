import user from '@infrastructure/persistence/postgres/models/user';

export default async () => {
    await user.sync({ alter: true });
};