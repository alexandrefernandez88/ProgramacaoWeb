import { Router } from 'express';
import ProdutoCtrl from '../Controle/produtoCtrl.js';

const rotaProduto = new Router();
const produtoCtrl = new ProdutoCtrl();

rotaProduto.post('/', produtoCtrl.gravar)
    .put('/', produtoCtrl.atualizar)
    .delete('/', produtoCtrl.excluir)
    .get('/', produtoCtrl.consultar)

export default rotaProduto;