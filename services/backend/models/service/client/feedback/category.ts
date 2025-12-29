// Category model

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
import db from '../../../../db';
import Feedback from './feedback';

class Category extends Model<InferAttributes<Category>, InferCreationAttributes<Category>> {
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

export type CategoryCreationAttributes = InferCreationAttributes<Category>;
export type CategoryAttributes = InferAttributes<Category>;

Category.init({
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
    modelName: 'Category',
    tableName: 'categories',
    timestamps: true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
});

export default Category;