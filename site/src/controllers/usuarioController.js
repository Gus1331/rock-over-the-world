var usuarioModel = require("../models/usuarioModel");

function autenticarApelido(req, res) {
    var apelido = req.body.apelidoServer;

    if (apelido == undefined) {
        res.status(400).send("Seu apelido está undefined!");

    } else {
        usuarioModel.autenticarApelido(apelido).then(
            function (resultadoAutenticarApelido) {
                console.log(`\nResultados encontrados: ${resultadoAutenticarApelido.length}`);
                console.log(`Resultados: ${JSON.stringify(resultadoAutenticarApelido)}`); // transforma JSON em String

                if (resultadoAutenticarApelido.length == 0) {
                    res.json({
                        allowed: true
                    })
                } else if (resultadoAutenticarApelido.length == 1) {
                    res.json({
                        allowed: false
                    })
                } else {
                    res.status(403).send("Erro ao verificar apelido");
                }
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao realizar a verificação apelido: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
    }
}

function autenticar(req, res) {
    var apelido = req.body.apelidoServer;
    var senha = req.body.senhaServer;

    if (apelido == undefined) {
        res.status(400).send("Seu apelido está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(apelido, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);
                        res.json({
                            id: resultadoAutenticar[0].idUsuario,
                            apelido: resultadoAutenticar[0].apelido,
                            nome: resultadoAutenticar[0].nome,
                            senha: resultadoAutenticar[0].senha,
                            dtNasc: resultadoAutenticar[0].dtNasc,
                            dtConta: resultadoAutenticar[0].dtConta,
                            sexo: resultadoAutenticar[0].sexo,
                            email: resultadoAutenticar[0].email,
                            imgPerfil: resultadoAutenticar[0].imgPerfil
                        });

                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("apelido e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var dtNasc = req.body.dtNascServer;
    var sexo = req.body.sexoServer;
    var regiao = req.body.regiaoServer;
    var apelido = req.body.apelidoServer;

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (regiao == undefined) {
        res.status(400).send("Sua regiao está undefined!");
    } else if (apelido == undefined) {
        res.status(400).send("Seu apelido está undefined!");
    } else if (dtNasc == undefined) {
        res.status(400).send("Sua dtNasc está undefined!");
    } else if (sexo === undefined) {
        res.status(400).send("Seu sexo está undefined!");
    } else {

        
        usuarioModel.cadastrar(nome, email, senha, apelido, dtNasc, regiao, sexo)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}



function requisitarDados(req, res) {
    var senha = req.body.senhaServer;
    var apelido = req.body.apelidoServer;

    usuarioModel.requisitarDados(apelido, senha)
        .then(resultado => {
            res.json(resultado);
        }).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao requisitar dados! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function conectarFavoritos(req, res) {
    var idUsuario = req.body.idUsuarioServer;

    usuarioModel.conectarFavoritos(idUsuario)
        .then(resultado => {
            res.json(resultado);
        }).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao pegar id de favoritos! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function atualizarFotoPerfil (req, res){
    var idUsuario = req.body.idUsuarioServer;
    var profileImg = req.body.profileImgServer;

    usuarioModel.atualizarFotoPerfil(idUsuario, profileImg)
        .then(resultado => {
            res.json(resultado);
        }).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao pegar id de ft de perfil! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    autenticar,
    autenticarApelido,
    cadastrar,
    requisitarDados,
    atualizarFotoPerfil,
    conectarFavoritos,
}