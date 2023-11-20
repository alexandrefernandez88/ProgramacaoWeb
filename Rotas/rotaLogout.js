import { Router } from "express";

const rotaLogout = new Router();

rotaLogout.get('/', (req, resp) => {
    req.session.destroy((erro) => {
        if (erro) {
            console.error(erro); //registrar nos logs
        }
        resp.redirect('/login.html');
    });
});

export default rotaLogout;