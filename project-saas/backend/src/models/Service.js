module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Service', {
    name:        { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT,   allowNull: false },
    price:       { type: DataTypes.FLOAT,  allowNull: false },
    imageUrl:    { type: DataTypes.STRING, allowNull: true },
    category:    { type: DataTypes.STRING, allowNull: false }
  }, { tableName: 'services', timestamps: false });
};
