const { Router } = require('express');
const routes = Router();
const jwt = require('jsonwebtoken'); // chama o JWT(Quem gera o token)

const port = 3001; // porta pra localhost 
let path = require('path');

const loginController = require('./controllers/loginController');
const regisController = require('./controllers/regisController');
const userController = require('./controllers/userController');

function verifyJWT(req, res, next){ //função que checa se o token é válido
    var token = req.headers['x-access-token'] || req.body.token; //o token pode ser passado tanto no cabeçalho através
    // do cabeçalho "x-access-token" ou através do corpo da requisição
    if (!token) //se não existir token, temos um erro
        res.status(500); 
    
    jwt.verify(token, process.env.SECRET, function(err, decoded) { //jwt.verify verifica o token
        if (err){
            return res.status(500);
        }  
        next(); 
    }); 
} 

routes.post('/login', loginController.verify);
routes.get('/login', loginController.show);
routes.get('/cadastro', regisController.registration);
routes.get('/home', verifyJWT, userController.auth); /*Quando for criar uma nova rota, depois da pasta, use o "verifyJWT",
é essa função que verifica se o usuário está autenticado, sem ele, qualquer um tem acesso*/ 


module.exports = routes;