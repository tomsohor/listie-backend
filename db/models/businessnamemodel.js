const { DataTypes } = require('sequelize');
const dbConnection = require('../config');

const Owner = require('./ownermodel');

const Business_name = dbConnection.define('BusinessName', {
    id:{
     type:DataTypes.UUID,
     defaultValue:DataTypes.UUIDV4,
     allowNull:false,
     primaryKey:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull: false,
        defaultValue:'Shop Name'
    },   
});
Owner.hasOne(Business_name,{
    foreignKey:{
        type:DataTypes.UUID,
        allowNull: false
    }
})
Business_name.belongsTo(Owner)

Business_name.sync({alter:true});

module.exports = Business_name;
