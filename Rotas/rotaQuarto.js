import { Router } from 'express';
import QuartoCTRL from '../Controle/quartoCtrl.js';

const rotaQuarto = new Router();
const quartoCTRL = new QuartoCTRL();

rotaQuarto.post('/', quartoCTRL.gravar)
    .put('/', quartoCTRL.atualizar)
    .delete('/', quartoCTRL.excluir)
    .get('/', quartoCTRL.consultar)

export default rotaQuarto;