import CheckoutMOD from "../Modelo/CheckoutMOD.js";

export default class CheckoutCTRL{
    gravar(requisicao, resposta) {
        resposta.type("application/json");

        if (requisicao.method === "POST" && requisicao.is("application/json")){
            const dados = requisicao.body;
            const datacheckout = dados.datacheckout;
            const idquarto = dados.idquarto;
            const idcliente = dados.idcliente;

            if (datacheckout && idquarto && idcliente){
                const checkout = new CheckoutMOD(null, datacheckout, idquarto, idcliente);

                checkout.gravar().then(() => {
                    resposta.status(200).json({
                        status: true,
                        mensagem: "Check-Out realizado com sucesso!"
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
                    mensagem: 'Informe adequadamente todos os dados do check-out conforme documentação da API'
                });
            }
        }
        else {
            resposta.status(400).json({
                status: false,
                mensagem: 'Método não permitido ou check-out no formato JSON não fornecido! Consulte a documentação da API'
            });
        }
    }

    atualizar(requisicao, resposta) {
        resposta.type('application/json');

        if (requisicao.method === 'PUT' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const idhospedagem = dados.idhospedagem;
            const datacheckout = dados.datacheckout;
            const idquarto = dados.idquarto;
            const idcliente = dados.idcliente;

            if (idhospedagem && datacheckout && idquarto && idcliente){
                const checkout = new CheckoutMOD(idhospedagem, datacheckout, idquarto, idcliente);

                checkout.atualizar().then(() => {
                    resposta.status(200).json({
                        status: true,
                        mensagem: 'Check-Out atualizado com sucesso!'
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
                    mensagem: 'Informe adequadamente todos os dados do check-out conforme documentação da API'
                });
            }
        }
        else {
            resposta.status(400).json({
                status: false,
                mensagem: 'Método não permitido ou check-out no formato JSON não fornecido! Consulte a documentação da API'
            });
        }
    }

    excluir(requisicao, resposta) {
        resposta.type('application/json');

        if (requisicao.method === 'DELETE' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const idHospedagem = dados.idhospedagem;

            if (idHospedagem) {
                const checkout = new CheckoutMOD(idHospedagem);

                checkout.removerDoBanco().then(() => {
                    resposta.status(200).json({
                        status: true,
                        mensagem: 'Check-out excluído com sucesso!'
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
                    mensagem: 'Informe o Id do check-out adequadamente conforme documentação da API'
                });
            }
        }
        else {
            resposta.status(400).json({
                status: false,
                mensagem: 'Método não permitido ou check-out no formato JSON não fornecido! Consulte a documentação da API'
            });
        }
    }

    consultar(requisicao, resposta) {
        resposta.type('application/json');

        if (requisicao.method === 'GET') {
            const checkout = new CheckoutMOD();

            checkout.consultar('').then((checkouts) => {
                resposta.status(200).json(checkouts);
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
                mensagem: 'Método não permitido ou check-out no formato JSON não fornecido! Consulte a documentação da API'
            });
        }
    }
}