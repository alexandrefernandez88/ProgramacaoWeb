import { Router } from 'express';
import ClienteCTRL from '../Controle/clienteCtrl.js';

const rotaCliente = new Router();
const clienteCTRL = new ClienteCTRL();

rotaCliente.post('/', clienteCTRL.gravar)
    .put('/', clienteCTRL.atualizar)
    .delete('/', clienteCTRL.excluir)
    .get('/', clienteCTRL.consultar)
    .get('/:cpf', clienteCTRL.consultarPorCPF)

export default rotaCliente;