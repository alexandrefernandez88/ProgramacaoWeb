import { Router } from 'express';
import CheckoutCtrl from '../Controle/checkoutCtrl.js';

const rotaCheckout = new Router();
const checkoutCtrl = new CheckoutCtrl();

rotaCheckout.post('/', checkoutCtrl.gravar)
    .put('/', checkoutCtrl.atualizar)
    .delete('/', checkoutCtrl.excluir)
    .get('/', checkoutCtrl.consultar)

export default rotaCheckout;