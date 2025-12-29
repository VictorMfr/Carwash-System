// Client model

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
    HasManyAddAssociationMixin,
    HasManyHasAssociationMixin,
    HasManyCountAssociationsMixin,
    HasManySetAssociationsMixin,
    HasManyRemoveAssociationMixin,
    HasManyRemoveAssociationsMixin,
    HasManyCreateAssociationMixin,
    HasManyGetAssociationsMixin
} from 'sequelize';
import db from '../../../../db';
import Feedback from './feedback';

class OpinionType extends Model<InferAttributes<OpinionType>, InferCreationAttributes<OpinionType>> {
    declare id: CreationOptional<number>;
    declare name: string;

    // Has many Feedbacks (1:N)
    declare Feedbacks: NonAttribute<Feedback[]>;
    declare getFeedbacks: HasManyGetAssociationsMixin<Feedback>;
    declare countFeedbacks: HasManyCountAssociationsMixin;
    declare hasFeedback: HasManyHasAssociationMixin<Feedback, number>;
    declare hasFeedbacks: HasManyHasAssociationMixin<Feedback, number>;
    declare setFeedbacks: HasManySetAssociationsMixin<Feedback, number>;
    declare addFeedback: HasManyAddAssociationMixin<Feedback, number>;
    declare addFeedbacks: HasManyAddAssociationMixin<Feedback, number>;
    declare removeFeedback: HasManyRemoveAssociationMixin<Feedback, number>;
    declare removeFeedbacks: HasManyRemoveAssociationsMixin<Feedback, number>;
    declare createFeedback: HasManyCreateAssociationMixin<Feedback>;
}

export type OpinionTypeCreationAttributes = InferCreationAttributes<OpinionType>;
export type OpinionTypeAttributes = InferAttributes<OpinionType>;

OpinionType.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: db,
    modelName: 'OpinionType',
    tableName: 'opinion_types',
    timestamps: true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
});

export default OpinionType;