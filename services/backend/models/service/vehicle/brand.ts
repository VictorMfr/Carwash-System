// Brand model

import { 
    Model, 
    DataTypes, 
    InferAttributes, 
    InferCreationAttributes, 
    CreationOptional, 
    NonAttribute,
    HasManyGetAssociationsMixin,
    HasManyAddAssociationMixin,
    HasManyHasAssociationMixin,
    HasManyCountAssociationsMixin,
    HasManyCreateAssociationMixin,
    HasManySetAssociationsMixin,
    HasManyRemoveAssociationMixin,
    HasManyRemoveAssociationsMixin
} from 'sequelize';
import db from '../../../db';
import Vehicle from './vehicle';

class VehicleBrand extends Model<InferAttributes<VehicleBrand>, InferCreationAttributes<VehicleBrand>> {
    declare id: CreationOptional<number>;
    declare name: string;

    // Has many Vehicles
    declare Vehicles: NonAttribute<Vehicle[]>;
    declare getVehicles: HasManyGetAssociationsMixin<Vehicle>;
    declare countVehicles: HasManyCountAssociationsMixin;
    declare hasVehicle: HasManyHasAssociationMixin<Vehicle, number>;
    declare hasVehicles: HasManyHasAssociationMixin<Vehicle, number>;
    declare setVehicles: HasManySetAssociationsMixin<Vehicle, number>;
    declare addVehicle: HasManyAddAssociationMixin<Vehicle, number>;
    declare addVehicles: HasManyAddAssociationMixin<Vehicle, number>;
    declare removeVehicle: HasManyRemoveAssociationMixin<Vehicle, number>;
    declare removeVehicles: HasManyRemoveAssociationsMixin<Vehicle, number>;
    declare createVehicle: HasManyCreateAssociationMixin<Vehicle>;

    declare created_at: CreationOptional<Date>;
    declare updated_at: CreationOptional<Date>;
    declare deleted_at: CreationOptional<Date | null>;
}

export type VehicleBrandCreationAttributes = InferCreationAttributes<VehicleBrand>;
export type VehicleBrandAttributes = InferAttributes<VehicleBrand>;

VehicleBrand.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
    },
}, {
    sequelize: db,
    modelName: 'VehicleBrand',
    tableName: 'vehicle_brands',
    timestamps: true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
});

export default VehicleBrand;