import ConsumoMOD from "../Modelo/ConsumoMOD.js";  //ajustado

export default class ConsumoCTRL{           //ajustado
    gravar(requisicao, resposta) {
        resposta.type("application/json");

        if (requisicao.method === "POST" && requisicao.is("application/json")){
            const dados = requisicao.body;
            const dataconsumo = dados.dataconsumo;//ajustado
            const idquarto = dados.idquarto;
            const idcliente = dados.idcliente;

            if (dataconsumo && idquarto && idcliente){  //ajustado
                const consumo = new ConsumoMOD(null, dataconsumo, idquarto, idcliente);//ajustado

                consumo.gravar().then(() => {   //ajustado
                    resposta.status(200).json({
                        status: true,
                        mensagem: "Item incluído com sucesso!" //ajustado
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
                    mensagem: 'Informe todos os dados do consumo'  //ajustado
                });
            }
        }
        else {
            resposta.status(400).json({
                status: false,
                mensagem: 'Método não permitido ou consumo no formato JSON não fornecido! Consulte a documentação da API'  //ajustado
            });
        }
    }

    atualizar(requisicao, resposta) {
        resposta.type('application/json');

        if (requisicao.method === 'PUT' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const idhospedagem = dados.idhospedagem;
            const dataconsumo = dados.dataconsumo;  //ajustado
            const idquarto = dados.idquarto;
            const idcliente = dados.idcliente;

            if (idhospedagem && dataconsumo && idquarto && idcliente){//ajustado
                const consumo = new ConsumoMOD(idhospedagem, dataconsumo, idquarto, idcliente);  //ajustado

                consumo.atualizar().then(() => {//ajustado
                    resposta.status(200).json({
                        status: true,
                        mensagem: 'Consumo atualizado com sucesso!' //ajustado
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
                    mensagem: 'Informe adequadamente todos os dados do consumo conforme documentação da API'
                });  //ajustado
            }
        }
        else {
            resposta.status(400).json({
                status: false,
                mensagem: 'Método não permitido ou consumo no formato JSON não fornecido! Consulte a documentação da API'
            });//ajustado
        }
    }

    excluir(requisicao, resposta) {
        resposta.type('application/json');

        if (requisicao.method === 'DELETE' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const idHospedagem = dados.idhospedagem;

            if (idHospedagem) {
                const consumo = new ConsumoMOD(idHospedagem);//ajustado

                consumo.removerDoBanco().then(() => {//ajustado
                    resposta.status(200).json({
                        status: true,
                        mensagem: 'Consumo excluído com sucesso!'//ajustado
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
                    mensagem: 'Informe o Id do consumo adequadamente conforme documentação da API'
                });//ajustado
            }
        }
        else {
            resposta.status(400).json({
                status: false,
                mensagem: 'Método não permitido ou consumo no formato JSON não fornecido! Consulte a documentação da API'
            });//ajustado
        }
    }

    consultar(requisicao, resposta) {
        resposta.type('application/json');

        if (requisicao.method === 'GET') {
            const consumo = new ConsumoMOD();//ajustado

            consumo.consultar('').then((consumos) => {//ajustado
                resposta.status(200).json(consumos);//ajustado
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
                mensagem: 'Método não permitido ou consumo no formato JSON não fornecido! Consulte a documentação da API'
            });//ajustado
        }
    }
}