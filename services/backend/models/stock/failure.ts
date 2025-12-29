// Failures model
import { 
    Model, 
    DataTypes, 
    InferAttributes, 
    InferCreationAttributes, 
    CreationOptional, 
    NonAttribute,
    BelongsToGetAssociationMixin,
    BelongsToSetAssociationMixin,
} from 'sequelize';
import db from '../../db';
import StockDetails from './stockDetails';

class Failure extends Model<InferAttributes<Failure>, InferCreationAttributes<Failure>> {
    declare id: CreationOptional<number>;
    declare description: string;
    declare resolved: boolean;

    // Belongs to StockDetail
    declare StockDetail: NonAttribute<StockDetails>;
    declare getStockDetail: BelongsToGetAssociationMixin<StockDetails>;
    declare setStockDetail: BelongsToSetAssociationMixin<StockDetails, number>;
}

export type FailureCreationAttributes = InferCreationAttributes<Failure>;
export type FailureAttributes = InferAttributes<Failure>;

Failure.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    resolved: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
}, {
    sequelize: db,
    modelName: 'Failure',
    tableName: 'failures',
    timestamps: true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
});

export default Failure;