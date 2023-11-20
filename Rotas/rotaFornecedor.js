import { Router } from 'express';
import FornecedorCTRL from '../Controle/fornecedorCtrl.js';

const rotaFornecedor = new Router();
const fornecedorCTRL = new FornecedorCTRL();

rotaFornecedor.post('/', fornecedorCTRL.gravar)
    .put('/', fornecedorCTRL.atualizar)
    .delete('/', fornecedorCTRL.excluir)
    .get('/', fornecedorCTRL.consultar)
    .get('/:cnpj', fornecedorCTRL.consultarPorCNPJ)

export default rotaFornecedor;