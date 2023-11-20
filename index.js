import express from 'express';
import session from 'express-session';
import Autenticar from './security/autenticacao.js';
import rotaLogin from './Rotas/rotaLogin.js';
import rotaLogout from './Rotas/rotaLogout.js';
import rotaCliente from './Rotas/rotaCliente.js';
import rotaCheckin from './Rotas/rotaCheckin.js';
import rotaFuncao from './Rotas/rotaFuncao.js';
import rotaFuncionario from './Rotas/rotaFuncionario.js';
import rotaProduto from './Rotas/rotaProduto.js';
import rotaTipoQuarto from './Rotas/rotaTipoQuarto.js';
import rotaQuarto from './Rotas/rotaQuarto.js';
import rotaFornecedor from './Rotas/rotaFornecedor.js';
import cors from 'cors';

const app = express();
const porta = 3010;

app.use(cors({ origin: "*" }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({
    secret: 'MiNhaChAveSec43Ta', //Esse parâmetro deve estar em uma variável de ambiente
    resave: true, //a cada requisição salvar o estado da sessão
    saveUninitialized: false, //Não salvar a sessão sem que o usuário tenha feito login
    cookie: {
        maxAge: 1000 * 60 * 30 //valor em milisegundos
    }
}));

app.use('/login', rotaLogin);
app.use('/logout', rotaLogout);
app.use('/clientes', rotaCliente);
app.use('/checkins', rotaCheckin);
app.use('/funcoes', rotaFuncao);
app.use('/funcionarios', rotaFuncionario);
app.use('/produtos', rotaProduto);
app.use('/tiposquartos', rotaTipoQuarto);
app.use('/quartos', rotaQuarto);
app.use('/fornecedores', rotaFornecedor);
app.use(express.static('./Publico'));
app.use(Autenticar, express.static('./Protegido'));
app.listen(porta, () => {
    console.log('Backend ouvindo em http://localhost:' + porta);
});