import { Router } from 'express';
import FuncaoCTRL from '../Controle/funcaoCtrl.js';

const rotaFuncao = new Router();
const funcaoCTRL = new FuncaoCTRL();

rotaFuncao.post('/', funcaoCTRL.gravar)
    .put('/', funcaoCTRL.atualizar)
    .delete('/', funcaoCTRL.excluir)
    .get('/', funcaoCTRL.consultar)

export default rotaFuncao;