const express = require('express'); // chama o express
const bodyParser = require('body-parser'); // chama o body parser pra ler o corpo do HTML ou json
const jwt = require('jsonwebtoken'); // chama o JWT(Quem gera o token)
let cookieParser = require('cookie-parser');

const port = 3001; // porta pra localhost 
let path = require('path');
const { access } = require('fs');
const app = express();
const SECRET = 'hWlkMaYDeacops2ms0'; // chave secreta que gera o token

app.use(bodyParser.json()); // lê json
app.use(bodyParser.urlencoded({extended: true })); // lê corpo do HTML
app.use(cookieParser());
app.set('view engine', 'ejs');

let login = "sami"; // caso de teste p/ verificar se o user consta no sistema
let password = "12345"; // caso de teste p/ verificar se a senha do user está correta

function verifyJWT(req, res, next){ //função que checa se o token é válido
    var token = req.headers['x-access-token'] || req.body.token; //o token pode ser passado tanto no cabeçalho através
    // do cabeçalho "x-access-token" ou através do corpo da requisição
    if (!token) //se não existir token, temos um erro
        res.status(500); 
    
    jwt.verify(token, SECRET, function(err, decoded) { //jwt.verify verifica o token
        if (err){
            return res.status(500);
        }  
        next(); 
    }); 
}  

app.post('/login', (req,res)=>{ // Rota onde recebe os dados do form
    if(req.body.password == password && req.body.login == login){//Checa se o usuário está cadastrado, se sim:

        const token = jwt.sign({user: req.body.login}, SECRET, { expiresIn: 300}); // token sendo gerado, expira em 5 minutos
        res.json({ auth: true, token });//autenticação feita
        console.log(token);
        
    }else{

        res.status(401).end();
        //console.log("Deu ruim");

    }
})

app.get('/login', (req,res)=>{ //Rota de login
    res.render('login');
});

app.get('/cadastro', (req,res)=>{ //Rota de cadastro
    res.render('cadastro');
})

app.get('/home', verifyJWT, (req,res)=>{ //Rota protegida(Só funciona com o token verificado)
    console.log("Agora você tem acesso :)");
    res.render('admin');
});

app.listen(port, ()=>{
    console.log("Server is working :)");
});