const express = require('express')
const dotenv  = require('dotenv')
const cors = require('cors')
const apiRota = require('./api')
const path = require('path')



dotenv.config()


const server = express()
server.use(express.static(path.join(__dirname, '../uploads')));
server.use('/uploads/', express.static('uploads'))
server.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization")
    server.use(cors());
    next();
});

server.use(express.json())
server.use(apiRota)




server.use((req, res)=>{
    res.status(404)
    res.json({error: 'Rota nao encontrada ERROR 404'})
})

server.listen(process.env.PORT)