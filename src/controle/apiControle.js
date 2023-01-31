const Bancodados = require('../mysql/models')
const DbLogin = require('../mysql/modelLogin')
const JWT = require('jsonwebtoken');

const dotenv  = require('dotenv')


dotenv.config()


exports.novoPost = async (req, res) =>{
    let dat = new Date
    let dataConvertida = dat.toLocaleDateString('pt-BR')
    let titulo = req.body.titulo
    let imagem = req.file.path.replace("\\", "/")
    let descricao = req.body.descricao
    let datas = dataConvertida
    let categoria = req.body.categoria
    let newPosts = await Bancodados.create({
        titulo, imagem, descricao, datas, categoria
    })
        
    res.json({id: newPosts.id, titulo, imagem, descricao, datas, categoria})
  console.log(req.file)
}


exports.getPost = async (req, res)=>{
    let blogGet = await Bancodados.findAll()
    res.send(blogGet)
}

exports.getId = async (req, res)=>{
    let {id} = req.params;
    let idGet = await Bancodados.findByPk(id)
    res.send(idGet)
}


exports.putPost = async (req, res)=>{
    let {id} = req.params
    let titulo = req.body.titulo
    let imagem = req.file.path.replace("\\", "/")
    let descricao = req.body.descricao
    let datas = req.body.datas
    let categoria = req.body.categoria
    let editPost = await Bancodados.findByPk(id)
    if(editPost){
        editPost.titulo = titulo
        editPost.imagem = imagem
        editPost.descricao = descricao
        editPost.datas = datas
        editPost.categoria = categoria
     await editPost.save()
     res.send(editPost)
    }else{
        res.send("Algo deu errado")
    }
}


exports.delPost = async (req, res)=>{
    let {id} = req.params;
    await Bancodados.destroy({where:{id}})
    res.send()
}


//login
exports.login = async (req, res) =>{
    if(req.body.usuario && req.body.senha){
        let usuario = req.body.usuario
        let senha = req.body.senha

        let user = await DbLogin.findOne({where:{usuario, senha}})
        if(user){
         const token = JWT.sign(
            { id: user.id, usuario: user.usuario },
             process.env.JWT_KEY,
             {expiresIn: '24hr'}
         )
           return res.status(200).send({
            token: token, usuario: user.usuario
           })
        }
    }
    res.json({status: false})
}