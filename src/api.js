const express = require('express')
const router = express.Router()
const Blogs = require('./controle/apiControle')
const multer = require('multer')


const storage = multer.diskStorage({
        destination(req, file, callback) {
            callback(null, './uploads/');
        },
        filename(req, file, callback) {
            callback(null, `${Date.now()}-${file.originalname}`);
        },})

const fileFiltro = (req, file, callback)=>{
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
       callback(null, true)
    }else{
        callback(null, false)
        callback(new Error('I don\'t have a clue!'))
    }
   
}  

const upload = multer ({
    storage: storage,
    fileFilter: fileFiltro
})


router.get('/blog', Blogs.getPost)
router.post('/blog',
upload.single('imagem'),
Blogs.novoPost)
router.get('/blog/:id', Blogs.getId)
router.put('/blog/:id',
upload.single('imagem'),
 Blogs.putPost)
router.delete('/blog/:id', Blogs.delPost)


router.post('/login', Blogs.login)


module.exports = router