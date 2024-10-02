import connector from '@infrastructure/persistence/postgres/models/connector';
import contact from '@infrastructure/persistence/postgres/models/contact';
import user from '@infrastructure/persistence/postgres/models/user';

export default async () => {
  await Promise.all(
    [user, connector, contact].map(async (model) => {
      await model.sync({ alter: true });
    })
  );

  user.hasMany(connector, { foreignKey: 'ownerId', onDelete: 'CASCADE' });
  connector.belongsTo(user);
};
