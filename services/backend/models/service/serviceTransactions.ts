// Service Transactions model
import { 
    Model, 
    DataTypes, 
    InferAttributes, 
    InferCreationAttributes, 
    CreationOptional
} from 'sequelize';
import db from '../../db';
import Service from './service';
import Transaction from '../finance/transaction';

class ServiceTransactions extends Model<InferAttributes<ServiceTransactions>, InferCreationAttributes<ServiceTransactions>> {
    declare id: CreationOptional<number>;
    declare serviceId: CreationOptional<number>;
    declare transactionId: CreationOptional<number>;
}

export type ServiceTransactionsCreationAttributes = InferCreationAttributes<ServiceTransactions>;
export type ServiceTransactionsAttributes = InferAttributes<ServiceTransactions>;

ServiceTransactions.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    serviceId: {
        type: DataTypes.INTEGER,
        references: {
            model: Service,
            key: 'id',
        },
        allowNull: false,
    },
    transactionId: {
        type: DataTypes.INTEGER,
        references: {
            model: Transaction,
            key: 'id',
        },
        allowNull: false,
    },
}, {
    sequelize: db,
    modelName: 'ServiceTransactions',
    tableName: 'service_transactions',
    timestamps: true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
});

export default ServiceTransactions;