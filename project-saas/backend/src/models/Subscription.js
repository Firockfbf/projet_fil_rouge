module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Subscription', {
    userId:    { type: DataTypes.INTEGER, allowNull: false },
    serviceId: { type: DataTypes.INTEGER, allowNull: false },
    quantity:  { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 }
  }, { tableName: 'subscriptions', timestamps: false });
};
