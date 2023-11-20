import QuartoMOD from "../Modelo/QuartoMOD.js";

export default class QuartoCTRL{
    gravar(requisicao, resposta) {
        resposta.type("application/json");

        if (requisicao.method === "POST" && requisicao.is("application/json")){
            const dados = requisicao.body;
            const idquarto = dados.idquarto;
            const idtipoquarto = dados.idtipoquarto;

            if (idquarto && idtipoquarto){
                const quarto = new QuartoMOD(idquarto, null, idtipoquarto);

                quarto.gravar().then(() => {
                    resposta.status(200).json({
                        status: true,
                        mensagem: "Quarto gravado com sucesso!"
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
                    mensagem: 'Informe adequadamente todos os dados do quarto conforme documentação da API'
                });
            }
        }
        else {
            resposta.status(400).json({
                status: false,
                mensagem: 'Método não permitido ou quarto no formato JSON não fornecido! Consulte a documentação da API'
            });
        }
    }

    atualizar(requisicao, resposta) {
        resposta.type('application/json');

        if (requisicao.method === 'PUT' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const idquarto = dados.idquarto;
            const idtipoquarto = dados.idtipoquarto;

            if (idquarto && idtipoquarto){
                const quarto = new QuartoMOD(idquarto, null, idtipoquarto);

                quarto.atualizar().then(() => {
                    resposta.status(200).json({
                        status: true,
                        mensagem: 'Quarto atualizado com sucesso!'
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
                    mensagem: 'Informe adequadamente todos os dados de um quarto conforme documentação da API'
                });
            }
        }
        else {
            resposta.status(400).json({
                status: false,
                mensagem: 'Método não permitido ou quarto no formato JSON não fornecido! Consulte a documentação da API'
            });
        }
    }

    excluir(requisicao, resposta) {
        resposta.type('application/json');

        if (requisicao.method === 'DELETE' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const idQuarto = dados.idquarto;

            if (idQuarto) {
                const quarto = new QuartoMOD(idQuarto);

                quarto.removerDoBanco().then(() => {
                    resposta.status(200).json({
                        status: true,
                        mensagem: 'Quarto excluído com sucesso!'
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
                    mensagem: 'Informe o Id do quarto adequadamente conforme documentação da API'
                });
            }
        }
        else {
            resposta.status(400).json({
                status: false,
                mensagem: 'Método não permitido ou quarto no formato JSON não fornecido! Consulte a documentação da API'
            });
        }
    }

    consultar(requisicao, resposta) {
        resposta.type('application/json');

        if (requisicao.method === 'GET') {
            const quarto = new QuartoMOD();

            quarto.consultar('').then((quartos) => {
                resposta.status(200).json(quartos);
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
                mensagem: 'Método não permitido ou quarto no formato JSON não fornecido! Consulte a documentação da API'
            });
        }
    }
}