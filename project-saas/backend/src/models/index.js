const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');
const sequelize = new Sequelize({ dialect: 'sqlite', storage: path.join(__dirname, 'database.sqlite') });

const User = require('./User')(sequelize, DataTypes);
const Service = require('./Service')(sequelize, DataTypes);
const Subscription = require('./Subscription')(sequelize, DataTypes);

User.hasMany(Subscription, { foreignKey: 'userId' });
Subscription.belongsTo(User, { foreignKey: 'userId' });
Service.hasMany(Subscription, { foreignKey: 'serviceId' });
Subscription.belongsTo(Service, { foreignKey: 'serviceId' });

module.exports = { sequelize, User, Service, Subscription };
