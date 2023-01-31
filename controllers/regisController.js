class RegisController{

    async registration(req,res){ //Rota de cadastro
        res.render('cadastro');
    }
}

module.exports = new RegisController;