import sequelize from '@infrastructure/persistence/postgres/sequelize';
import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';

interface ContactModel {
  id: string;
  ownerId: string;
  source: string;
  externalId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

class ContactModel extends Model<
  InferAttributes<ContactModel>,
  InferCreationAttributes<ContactModel>
> {
  declare id: string;
  declare ownerId: string;
  declare source: string;
  declare externalId: string;
  declare phoneNumber: string;
  declare firstName: string;
  declare lastName: string;
  declare email: string;
  declare readonly createdAt: CreationOptional<Date>;
  declare readonly updatedAt: CreationOptional<Date>;
}

ContactModel.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    ownerId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    externalId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    source: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  },
  { sequelize, tableName: 'contacts', timestamps: true }
);

export default ContactModel;
