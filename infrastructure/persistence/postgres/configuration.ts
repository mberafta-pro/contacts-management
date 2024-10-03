import connector from '@infrastructure/persistence/postgres/models/connector';
import contact from '@infrastructure/persistence/postgres/models/contact';
import user from '@infrastructure/persistence/postgres/models/user';

const configure = async () => {
  console.log('[POSTGRES] - Initialize database\n');
  await Promise.all(
    [user, connector, contact].map(async (model) => {
      console.log(`Processing model ${model.name}`);
      await model.sync({ alter: true });
    })
  );

  user.hasMany(connector, { foreignKey: 'ownerId', onDelete: 'CASCADE' });
  user.hasMany(contact, { foreignKey: 'ownerId', onDelete: 'CASCADE' });
  connector.belongsTo(user);
};

configure();
