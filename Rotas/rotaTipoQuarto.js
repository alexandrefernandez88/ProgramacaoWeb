import { Router } from 'express';
import TipoQuartoCTRL from '../Controle/tipoquartoCtrl.js';

const rotaTipoQuarto = new Router();
const tipoquartoCTRL = new TipoQuartoCTRL();

rotaTipoQuarto.post('/', tipoquartoCTRL.gravar)
    .put('/', tipoquartoCTRL.atualizar)
    .delete('/', tipoquartoCTRL.excluir)
    .get('/', tipoquartoCTRL.consultar)

export default rotaTipoQuarto;