// Associations
import User from './auth/user';
import Stock from './stock/stock';
import Product from './stock/product';
import StockBrand from './stock/brand';
import State from './stock/state';
import Recipe from './service/recipe';
import Service from './service/service';
import Operator from './service/operator';
import Vehicle from './service/vehicle/vehicle';
import VehicleBrand from './service/vehicle/brand';
import Client from './service/client/client';
import Account from './finance/account';
import Transaction from './finance/transaction';
import Method from './finance/method';
import VehicleModel from './service/vehicle/model';
import RecipeStockDetails from './service/recipeStockDetails';
import ServiceStockDetails from './service/serviceStockDetails';
import ServiceOperator from './service/serviceOperator';
import StockDetails from './stock/stockDetails';
import Failure from './stock/failure';
import Feedback from './service/client/feedback/feedback';

// services/backend/models/associations.ts
User.hasOne(Stock);
Stock.belongsTo(User);

Product.hasOne(Stock);
Stock.belongsTo(Product);

StockBrand.hasMany(StockDetails);
StockDetails.belongsTo(StockBrand);

State.hasMany(StockDetails);
StockDetails.belongsTo(State);

Stock.hasMany(StockDetails);
StockDetails.belongsTo(Stock);


StockDetails.hasOne(Failure);
Failure.belongsTo(StockDetails);

// Service module
Recipe.hasMany(Service, {
    as: 'Services',
    foreignKey: 'recipeId',
});

Service.belongsTo(Recipe, {
    as: 'Recipe',
    foreignKey: 'recipeId',
});





Recipe.belongsToMany(StockDetails, {
    through: RecipeStockDetails,
    as: 'StockDetails',
    foreignKey: 'recipeId',
    otherKey: 'stockDetailId',
});
StockDetails.belongsToMany(Recipe, {
    through: RecipeStockDetails,
    as: 'Recipes',
    foreignKey: 'stockDetailId',
    otherKey: 'recipeId',
});
RecipeStockDetails.belongsTo(StockDetails, { as: 'StockDetails', foreignKey: 'stockDetailId' });
RecipeStockDetails.belongsTo(Recipe, { as: 'Recipe', foreignKey: 'recipeId' });

Service.belongsToMany(StockDetails, {
    through: ServiceStockDetails,
    as: 'StockDetails',
    foreignKey: 'serviceId',
    otherKey: 'stockDetailId',
});
StockDetails.belongsToMany(Service, {
    through: ServiceStockDetails,
    as: 'Services',
    foreignKey: 'stockDetailId',
    otherKey: 'serviceId',
});

ServiceStockDetails.belongsTo(StockDetails, { as: 'StockDetails', foreignKey: 'stockDetailId' });
ServiceStockDetails.belongsTo(Service, { as: 'Service', foreignKey: 'serviceId' });

Service.belongsToMany(Operator, { 
    through: { model: ServiceOperator },
    as: 'Operators',
    foreignKey: 'serviceId',
    otherKey: 'operatorId'
});
Operator.belongsToMany(Service, { 
    through: { model: ServiceOperator },
    as: 'Services',
    foreignKey: 'operatorId',
    otherKey: 'serviceId'
});

Vehicle.hasOne(Service);
Service.belongsTo(Vehicle);

VehicleModel.hasMany(Vehicle, { as: 'Vehicles', foreignKey: 'modelId' });
Vehicle.belongsTo(VehicleModel, { as: 'VehicleModel', foreignKey: 'modelId' });

VehicleBrand.hasMany(Vehicle, { as: 'Vehicles', foreignKey: 'brandId' });
Vehicle.belongsTo(VehicleBrand, { as: 'VehicleBrand', foreignKey: 'brandId' });

Client.hasMany(Vehicle, { as: 'Vehicles', foreignKey: 'clientId' });
Vehicle.belongsTo(Client, { as: 'Client', foreignKey: 'clientId' });

Client.hasMany(Feedback, { as: 'Feedbacks', foreignKey: 'clientId' });
Feedback.belongsTo(Client, { as: 'Client', foreignKey: 'clientId' });

// Finance module
User.hasMany(Transaction, { as: 'Transactions', foreignKey: 'userId' });
Transaction.belongsTo(User, { as: 'User', foreignKey: 'userId' });

Account.hasMany(Transaction, { as: 'Transactions', foreignKey: 'accountId' });
Transaction.belongsTo(Account, { as: 'Account', foreignKey: 'accountId' });

Method.hasMany(Transaction, { as: 'Transactions', foreignKey: 'methodId' });
Transaction.belongsTo(Method, { as: 'Method', foreignKey: 'methodId' });

// StockDetail ↔ Transaction (1:1)
Transaction.hasOne(StockDetails, { as: 'StockDetail', foreignKey: 'transactionId' });
StockDetails.belongsTo(Transaction, { as: 'Transaction', foreignKey: 'transactionId' });

// Un servicio solo tiene una transaccion
Transaction.hasOne(Service, { as: 'Service', foreignKey: 'transactionId' });
Service.belongsTo(Transaction, { as: 'Transactions', foreignKey: 'transactionId' });

export {
    User,
    Stock,
    Product,
    StockDetails,
    StockBrand as Brand,
    State,
    Recipe,
    Service,
    Vehicle,
    Operator,
    VehicleBrand,
    VehicleModel,
    Account,
    Method,
    Client,
    Transaction,
    Feedback
};