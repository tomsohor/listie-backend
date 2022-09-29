const { DataTypes } = require("sequelize");
const dbConnection = require("../config");

const Owner = require("./ownermodel");

const Item = dbConnection.define("item", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  itemname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  itemtype: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  customertype: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  pic: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

Owner.hasMany(Item, {
  foreignKey: {
    name: "ownerId",
    allowNull: false,
  },
});

Item.belongsTo(Owner, {
  // foreignKey:'owerId'
});

Item.sync({ alter: true });

module.exports = Item;
