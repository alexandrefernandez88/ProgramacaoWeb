import FuncaoMOD from "../Modelo/FuncaoMOD.js";

export default class FuncaoCTRL{
    gravar(requisicao, resposta) {
        resposta.type("application/json");

        if (requisicao.method === "POST" && requisicao.is("application/json")){
            const dados = requisicao.body;
            const nome = dados.nome;
            const descricao = dados.descricao;

            if (nome && descricao){
                const funcao = new FuncaoMOD(null, nome, descricao);

                funcao.gravar().then(() => {
                    resposta.status(200).json({
                        status: true,
                        mensagem: "Função gravada com sucesso!"
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        status: false,
                        mensagem: erro.message
                    });
                });
            }
            else {
                resposta.status(400).json({
                    status: false,
                    mensagem: 'Informe adequadamente todos os dados de uma função conforme documentação da API'
                });
            }
        }
        else {
            resposta.status(400).json({
                status: false,
                mensagem: 'Método não permitido ou função no formato JSON não fornecida! Consulte a documentação da API'
            });
        }
    }

    atualizar(requisicao, resposta) {
        resposta.type('application/json');

        if (requisicao.method === 'PUT' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const idfuncao = dados.idfuncao;
            const nome = dados.nome;
            const descricao = dados.descricao;

            if (idfuncao && nome && descricao){
                const funcao = new FuncaoMOD(idfuncao, nome, descricao);

                funcao.atualizar().then(() => {
                    resposta.status(200).json({
                        status: true,
                        mensagem: 'Função atualizada com sucesso!'
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        status: false,
                        mensagem: erro.message
                    });
                });
            }
            else {
                resposta.status(400).json({
                    status: false,
                    mensagem: 'Informe adequadamente todos os dados de uma função conforme documentação da API'
                });
            }
        }
        else {
            resposta.status(400).json({
                status: false,
                mensagem: 'Método não permitido ou função no formato JSON não fornecida! Consulte a documentação da API'
            });
        }
    }

    excluir(requisicao, resposta) {
        resposta.type('application/json');

        if (requisicao.method === 'DELETE' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const idFuncao = dados.idfuncao;

            if (idFuncao) {
                const funcao = new FuncaoMOD(idFuncao);

                funcao.removerDoBanco().then(() => {
                    resposta.status(200).json({
                        status: true,
                        mensagem: 'Função excluída com sucesso!'
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        status: false,
                        mensagem: erro.mensage
                    });
                });
            }
            else {
                resposta.status(400).json({
                    status: false,
                    mensagem: 'Informe o Id da função adequadamente conforme documentação da API'
                });
            }
        }
        else {
            resposta.status(400).json({
                status: false,
                mensagem: 'Método não permitido ou função no formato JSON não fornecida! Consulte a documentação da API'
            });
        }
    }

    consultar(requisicao, resposta) {
        resposta.type('application/json');

        if (requisicao.method === 'GET') {
            const funcao = new FuncaoMOD();

            funcao.consultar('').then((funcoes) => {
                resposta.status(200).json(funcoes);
            }).catch((erro) => {
                resposta.status(500).json({
                    status: false,
                    mensagem: erro.message
                });
            });
        }
        else {
            resposta.status(400).json({
                status: false,
                mensagem: 'Método não permitido ou função no formato JSON não fornecida! Consulte a documentação da API'
            });
        }
    }
}