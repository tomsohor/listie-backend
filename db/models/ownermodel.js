const { DataTypes } = require('sequelize');
const dbConnection = require('../config');


const Owner = dbConnection.define('users', {
    id:{
        type:DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey:true
    },
    username:{
        type:DataTypes.STRING,
        allowNull: false,
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
    }
},{
    tableName:'Owner'
});



Owner.sync({alter:true});

module.exports = Owner;
