// Feedback model

import { 
    Model, 
    DataTypes, 
    InferAttributes, 
    InferCreationAttributes, 
    CreationOptional, 
    NonAttribute,
    BelongsToCreateAssociationMixin
} from 'sequelize';
import Client from '../client';
import db from '../../../../db';
import { BelongsToGetAssociationMixin } from 'sequelize';
import { BelongsToSetAssociationMixin } from 'sequelize';

class Feedback extends Model<InferAttributes<Feedback>, InferCreationAttributes<Feedback>> {
    declare id: CreationOptional<number>;
    declare description: string;
    declare opinionType: string;
    declare category: string;

    // Belongs to Client
    declare Client: NonAttribute<Client>;
    declare getClient: BelongsToGetAssociationMixin<Client>;
    declare setClient: BelongsToSetAssociationMixin<Client, number>;
    declare createClient: BelongsToCreateAssociationMixin<Client>;

}

export type FeedbackCreationAttributes = InferCreationAttributes<Feedback>;
export type FeedbackAttributes = InferAttributes<Feedback>;

Feedback.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    opinionType: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: db,
    modelName: 'Feedback',
    tableName: 'feedbacks',
    timestamps: true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
});

export default Feedback;