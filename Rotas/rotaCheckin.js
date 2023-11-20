import { Router } from 'express';
import CheckinCtrl from '../Controle/checkinCtrl.js';

const rotaCheckin = new Router();
const checkinCtrl = new CheckinCtrl();

rotaCheckin.post('/', checkinCtrl.gravar)
    .put('/', checkinCtrl.atualizar)
    .delete('/', checkinCtrl.excluir)
    .get('/', checkinCtrl.consultar)

export default rotaCheckin;