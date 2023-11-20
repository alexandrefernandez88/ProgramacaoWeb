import { Router } from 'express'; //ajustado
import ConsumoCtrl from '../Controle/consumoCtrl.js';//ajustado

const rotaConsumo = new Router();//ajustado
const checonsumoCtrl = new ConsumoCtrl();//ajustado

rotaConsumo.post('/', consumoCtrl.gravar)//ajustado
    .put('/', consumoCtrl.atualizar)//ajustado
    .delete('/', consumoCtrl.excluir)//ajustado
    .get('/', consumoCtrl.consultar)//ajustado

export default rotaConsumo;//ajustado