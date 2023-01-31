const {Sequelize} = require('sequelize')
const database = require('./mysql')

const Blog = database.define('blog',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    titulo:{
        type: Sequelize.STRING,
        allowNull: false
    },
    imagem:{
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao:{
        type: Sequelize.STRING,
        allowNull: false
    },
    datas:{
        type: Sequelize.STRING,
        allowNull: false
    },
    categoria:{
        type: Sequelize.STRING,
        allowNull: false
    }
},{
    tableName: 'blog',
    timestamps: false
})

module.exports = Blog