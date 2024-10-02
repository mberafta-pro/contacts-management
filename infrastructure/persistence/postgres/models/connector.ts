import sequelize from '@infrastructure/persistence/postgres/sequelize';
import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';

interface Connector {
  id: string;
  ownerId: string;
  source: string;
  access: Record<string, string | number>;
}

class Connector extends Model<InferAttributes<Connector>, InferCreationAttributes<Connector>> {
  declare id: string;
  declare ownerId: string;
  declare source: string;
  declare access: Record<string, string | number>;
  declare readonly createdAt: CreationOptional<Date>;
  declare readonly updatedAt: CreationOptional<Date>;
}

Connector.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    ownerId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    source: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    access: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  },
  { sequelize, tableName: 'connectors', timestamps: true }
);

export default Connector;
