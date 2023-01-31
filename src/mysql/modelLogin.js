const {Sequelize} = require('sequelize')
const database = require('./mysql')


const Login = database.define('login',{
    id_login: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    usuario:{
        type: Sequelize.STRING,
        allowNull:false
    },
    senha:{
        type: Sequelize.STRING,
        allowNull:false
    }
},{
    tableName: 'login',
    timestamps: false
})

module.exports = Login