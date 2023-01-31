const { access } = require('fs');
const jwt = require('jsonwebtoken'); // chama o JWT(Quem gera o token)

let login = "sami"; // caso de teste p/ verificar se o user consta no sistema
let password = "12345"; // caso de teste p/ verificar se a senha do user está correta

class LoginController{
    async verify(req,res){ // Rota onde recebe os dados do form
        if(req.body.password == password && req.body.login == login){//Checa se o usuário está cadastrado, se sim:
    
            const token = jwt.sign({user: req.body.login}, process.env.SECRET, { expiresIn: 300}); // token sendo gerado, expira em 5 minutos
            res.json({ auth: true, token });//autenticação feita
            console.log(token);
            
        }else{
            res.status(401).end();
            //console.log("Deu ruim");
    
        }
    }

    async show(req,res){ //Rota de login
        res.render('login');
    }
}

module.exports = new LoginController;