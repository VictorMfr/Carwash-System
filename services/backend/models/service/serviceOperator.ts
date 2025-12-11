import {
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from "sequelize";
import db from "../../db";

class ServiceOperator extends Model<
    InferAttributes<ServiceOperator>,
    InferCreationAttributes<ServiceOperator>
> {
    declare serviceId: number;
    declare operatorId: number;
    declare isPaid: CreationOptional<boolean>;
    declare paidAt: CreationOptional<Date | null>;
    declare paidAmount: CreationOptional<number | null>;
}

ServiceOperator.init(
    {
        serviceId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: "services",
                key: "id",
            },
        },
        operatorId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: "operators",
                key: "id",
            },
        },
        isPaid: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        paidAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        paidAmount: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
    },
    {
        sequelize: db,
        tableName: "services_operators",
        modelName: "ServiceOperator",
        timestamps: false,
    }
);

export default ServiceOperator;

