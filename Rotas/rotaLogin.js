import { Router } from "express";

const rotaLogin = new Router(); //mini aplicação express

rotaLogin
    .get('/', (req, resp) => {
        resp.redirect('/login.html')
    })
    .post('/', (req, resp) => {
        const usuario = req.body.usuario;
        const senha = req.body.senha;
        if (usuario && senha && usuario === 'teste' && senha === '123') {
            req.session.usuarioLogado = true;
            resp.redirect('/');
        }
        else {
            resp.status(401).send("<p>Falha no Login</p><button onclick='history.back()'>OK</button>");
        }
    })
export default rotaLogin;