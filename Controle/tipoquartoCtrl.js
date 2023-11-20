import TipoQuartoMOD from "../Modelo/TipoQuartoMOD.js";

export default class TipoQuartoCTRL{
    gravar(requisicao, resposta) {
        resposta.type("application/json");

        if (requisicao.method === "POST" && requisicao.is("application/json")){
            const dados = requisicao.body;
            const nome = dados.nome;
            const descritivo = dados.descritivo;

            if (nome && descritivo){
                const tipoquarto = new TipoQuartoMOD(null, nome, descritivo);

                tipoquarto.gravar().then(() => {
                    resposta.status(200).json({
                        status: true,
                        mensagem: "Tipo de quarto gravado com sucesso!"
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
                    mensagem: 'Informe adequadamente todos os dados de tipo de quarto conforme documentação da API'
                });
            }
        }
        else {
            resposta.status(400).json({
                status: false,
                mensagem: 'Método não permitido ou tipo de quarto no formato JSON não fornecido! Consulte a documentação da API'
            });
        }
    }

    atualizar(requisicao, resposta) {
        resposta.type('application/json');

        if (requisicao.method === 'PUT' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const idtipoquarto = dados.idtipoquarto;
            const nome = dados.nome;
            const descritivo = dados.descritivo;

            if (idtipoquarto && nome && descritivo){
                const tipoquarto = new TipoQuartoMOD(idtipoquarto, nome, descritivo);

                tipoquarto.atualizar().then(() => {
                    resposta.status(200).json({
                        status: true,
                        mensagem: 'Tipo de quarto atualizado com sucesso!'
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
                    mensagem: 'Informe adequadamente todos os dados de um tipo de quarto conforme documentação da API'
                });
            }
        }
        else {
            resposta.status(400).json({
                status: false,
                mensagem: 'Método não permitido ou tipo de quarto no formato JSON não fornecido! Consulte a documentação da API'
            });
        }
    }

    excluir(requisicao, resposta) {
        resposta.type('application/json');

        if (requisicao.method === 'DELETE' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const idTipoquarto = dados.idtipoquarto;

            if (idTipoquarto) {
                const tipoquarto = new TipoQuartoMOD(idTipoquarto);

                tipoquarto.removerDoBanco().then(() => {
                    resposta.status(200).json({
                        status: true,
                        mensagem: 'Tipo de quarto excluído com sucesso!'
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
                    mensagem: 'Informe o Id do tipo de quarto adequadamente conforme documentação da API'
                });
            }
        }
        else {
            resposta.status(400).json({
                status: false,
                mensagem: 'Método não permitido ou tipo de quarto no formato JSON não fornecido! Consulte a documentação da API'
            });
        }
    }

    consultar(requisicao, resposta) {
        resposta.type('application/json');

        if (requisicao.method === 'GET') {
            const tipoquarto = new TipoQuartoMOD();

            tipoquarto.consultar('').then((tipoquarto) => {
                resposta.status(200).json(tipoquarto);
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
                mensagem: 'Método não permitido ou tipo de quarto no formato JSON não fornecido! Consulte a documentação da API'
            });
        }
    }
}