import { Router } from 'express';
import FuncionarioCTRL from '../Controle/funcionarioCtrl.js';

const rotaFuncionario = new Router();
const funcionarioCTRL = new FuncionarioCTRL();

rotaFuncionario.post('/', funcionarioCTRL.gravar)
    .put('/', funcionarioCTRL.atualizar)
    .delete('/', funcionarioCTRL.excluir)
    .get('/', funcionarioCTRL.consultar)
    .get('/:cpf', funcionarioCTRL.consultarPorCPF)

export default rotaFuncionario;