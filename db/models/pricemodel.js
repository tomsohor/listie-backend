const { DataTypes } = require('sequelize');
const dbConnection = require('../config');

const Item = require('./itemmodel');


const Price = dbConnection.define('itemprice', {
    id:{
        type:DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey:true
    },
    soldunit:{
        type:DataTypes.STRING,
        allowNull: false,
    },
    unitprice:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    ccy:{
        type:DataTypes.STRING,
        allowNull:false,
    }
});

Item.hasMany(Price, {
    foreignKey: {
        name: 'itemId',
        allowNull:false
    }
})

Price.belongsTo(Item,{
    foreignKey: 'itemId'
})

Price.sync({alter:true});

module.exports = Price;
