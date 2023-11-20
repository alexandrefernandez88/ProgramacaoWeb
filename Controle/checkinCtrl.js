import CheckinMOD from "../Modelo/CheckinMOD.js";

export default class CheckinCTRL{
    gravar(requisicao, resposta) {
        resposta.type("application/json");

        if (requisicao.method === "POST" && requisicao.is("application/json")){
            const dados = requisicao.body;
            const datacheckin = dados.datacheckin;
            const idquarto = dados.idquarto;
            const idcliente = dados.idcliente;

            if (datacheckin && idquarto && idcliente){
                const checkin = new CheckinMOD(null, datacheckin, idquarto, idcliente);

                checkin.gravar().then(() => {
                    resposta.status(200).json({
                        status: true,
                        mensagem: "Check-In realizado com sucesso!"
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
                    mensagem: 'Informe adequadamente todos os dados do check-in conforme documentação da API'
                });
            }
        }
        else {
            resposta.status(400).json({
                status: false,
                mensagem: 'Método não permitido ou check-in no formato JSON não fornecido! Consulte a documentação da API'
            });
        }
    }

    atualizar(requisicao, resposta) {
        resposta.type('application/json');

        if (requisicao.method === 'PUT' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const idhospedagem = dados.idhospedagem;
            const datacheckin = dados.datacheckin;
            const idquarto = dados.idquarto;
            const idcliente = dados.idcliente;

            if (idhospedagem && datacheckin && idquarto && idcliente){
                const checkin = new CheckinMOD(idhospedagem, datacheckin, idquarto, idcliente);

                checkin.atualizar().then(() => {
                    resposta.status(200).json({
                        status: true,
                        mensagem: 'Check-In atualizado com sucesso!'
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
                    mensagem: 'Informe adequadamente todos os dados do check-in conforme documentação da API'
                });
            }
        }
        else {
            resposta.status(400).json({
                status: false,
                mensagem: 'Método não permitido ou check-in no formato JSON não fornecido! Consulte a documentação da API'
            });
        }
    }

    excluir(requisicao, resposta) {
        resposta.type('application/json');

        if (requisicao.method === 'DELETE' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const idHospedagem = dados.idhospedagem;

            if (idHospedagem) {
                const checkin = new CheckinMOD(idHospedagem);

                checkin.removerDoBanco().then(() => {
                    resposta.status(200).json({
                        status: true,
                        mensagem: 'Check-in excluído com sucesso!'
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
                    mensagem: 'Informe o Id do check-in adequadamente conforme documentação da API'
                });
            }
        }
        else {
            resposta.status(400).json({
                status: false,
                mensagem: 'Método não permitido ou check-in no formato JSON não fornecido! Consulte a documentação da API'
            });
        }
    }

    consultar(requisicao, resposta) {
        resposta.type('application/json');

        if (requisicao.method === 'GET') {
            const checkin = new CheckinMOD();

            checkin.consultar('').then((checkins) => {
                resposta.status(200).json(checkins);
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
                mensagem: 'Método não permitido ou check-in no formato JSON não fornecido! Consulte a documentação da API'
            });
        }
    }
}