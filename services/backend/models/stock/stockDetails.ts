// Stock Details model

import { 
    Model, 
    DataTypes, 
    InferAttributes, 
    InferCreationAttributes, 
    CreationOptional, 
    NonAttribute,
    BelongsToGetAssociationMixin,
    BelongsToSetAssociationMixin,
    BelongsToCreateAssociationMixin,
    BelongsToManyGetAssociationsMixin,
    BelongsToManyAddAssociationMixin,
    BelongsToManyHasAssociationMixin,
    BelongsToManyCountAssociationsMixin,
    BelongsToManyCreateAssociationMixin,
    BelongsToManySetAssociationsMixin,
    BelongsToManyRemoveAssociationMixin,
    BelongsToManyRemoveAssociationsMixin,
    HasManyGetAssociationsMixin,
    HasManyAddAssociationMixin,
    HasManyHasAssociationMixin,
    HasManyCountAssociationsMixin,
    HasManyCreateAssociationMixin,
    HasManySetAssociationsMixin,
    HasManyRemoveAssociationMixin,
    HasManyRemoveAssociationsMixin
} from 'sequelize';
import db from '../../db';
import Brand from './brand';
import State from './state';
import Stock from './stock';
import Service from '../service/service';
import Transaction from '../finance/transaction';
import Failure from './failure';

class StockDetails extends Model<InferAttributes<StockDetails>, InferCreationAttributes<StockDetails>> {
    declare id: CreationOptional<number>;
    declare quantity: number;
    declare entry_date: Date;
    declare picture: string | null;
    declare StockId: CreationOptional<number>;

    // Belongs to Transaction
    declare Transaction: NonAttribute<Transaction>;
    declare getTransaction: BelongsToGetAssociationMixin<Transaction>;
    declare setTransaction: BelongsToSetAssociationMixin<Transaction, number>;
    declare createTransaction: BelongsToCreateAssociationMixin<Transaction>;

    // Belongs to Brand
    declare Brand: NonAttribute<Brand>;
    declare getBrand: BelongsToGetAssociationMixin<Brand>;
    declare setBrand: BelongsToSetAssociationMixin<Brand, number>;
    declare createBrand: BelongsToCreateAssociationMixin<Brand>;

    // Belongs to State
    declare State: NonAttribute<State>;
    declare getState: BelongsToGetAssociationMixin<State>;
    declare setState: BelongsToSetAssociationMixin<State, number>;
    declare createState: BelongsToCreateAssociationMixin<State>;

    // Belongs to Stock
    declare Stock: NonAttribute<Stock>;
    declare getStock: BelongsToGetAssociationMixin<Stock>;
    declare setStock: BelongsToSetAssociationMixin<Stock, number>;
    declare createStock: BelongsToCreateAssociationMixin<Stock>;

    // Many-to-many relationship with Service
    declare Services: NonAttribute<Service[]>;
    declare getServices: BelongsToManyGetAssociationsMixin<Service>;
    declare countServices: BelongsToManyCountAssociationsMixin;
    declare hasService: BelongsToManyHasAssociationMixin<Service, number>;
    declare hasServices: BelongsToManyHasAssociationMixin<Service, number>;
    declare setServices: BelongsToManySetAssociationsMixin<Service, number>;
    declare addService: BelongsToManyAddAssociationMixin<Service, number>;
    declare addServices: BelongsToManyAddAssociationMixin<Service, number>;
    declare removeService: BelongsToManyRemoveAssociationMixin<Service, number>;
    declare removeServices: BelongsToManyRemoveAssociationsMixin<Service, number>;
    declare createService: BelongsToManyCreateAssociationMixin<Service>;

    // Has many Failures
    declare Failures: NonAttribute<Failure[]>;
    declare getFailures: HasManyGetAssociationsMixin<Failure>;
    declare countFailures: HasManyCountAssociationsMixin;
    declare hasFailure: HasManyHasAssociationMixin<Failure, number>;
    declare setFailures: HasManySetAssociationsMixin<Failure, number>;
    declare addFailure: HasManyAddAssociationMixin<Failure, number>;
    declare addFailures: HasManyAddAssociationMixin<Failure, number>;
    declare removeFailure: HasManyRemoveAssociationMixin<Failure, number>;
    declare removeFailures: HasManyRemoveAssociationsMixin<Failure, number>;
    declare createFailure: HasManyCreateAssociationMixin<Failure>;
}

export type StockDetailsCreationAttributes = InferCreationAttributes<StockDetails>;
export type StockDetailsAttributes = InferAttributes<StockDetails>;

StockDetails.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    entry_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    picture: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    StockId: {
        type: DataTypes.INTEGER,
        references: {
            model: Stock,
            key: 'id',
        },
        allowNull: false,
    },
}, {
    sequelize: db,
    modelName: 'StockDetails',
    tableName: 'stock_details',
    timestamps: true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
});

export default StockDetails;