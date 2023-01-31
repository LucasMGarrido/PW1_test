class UserController{

    async auth(req,res){ //Rota protegida(Só funciona com o token verificado)
        console.log("Agora você tem acesso :)");
        res.render('admin');
    }
}

module.exports = new UserController;