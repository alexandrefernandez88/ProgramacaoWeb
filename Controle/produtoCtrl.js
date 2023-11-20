import ProdutoMOD from "../Modelo/ProdutoMOD.js";

export default class ProdutoCTRL{
    gravar(requisicao, resposta) {
        resposta.type("application/json");

        if (requisicao.method === "POST" && requisicao.is("application/json")){
            const dados = requisicao.body;
            const nome = dados.nome;
            const quantidade = dados.quantidade;
            const preco = dados.preco;

            if (nome && quantidade && preco){
                const produto = new ProdutoMOD(null, nome, quantidade, preco);

                produto.gravar().then(() => {
                    resposta.status(200).json({
                        status: true,
                        mensagem: "Produto gravado com sucesso!"
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
                    mensagem: 'Informe adequadamente todos os dados de um produto conforme documentação da API'
                });
            }
        }
        else {
            resposta.status(400).json({
                status: false,
                mensagem: 'Método não permitido ou produto no formato JSON não fornecido! Consulte a documentação da API'
            });
        }
    }

    atualizar(requisicao, resposta) {
        resposta.type('application/json');

        if (requisicao.method === 'PUT' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const idproduto = dados.idproduto;
            const nome = dados.nome;
            const quantidade = dados.quantidade;
            const preco = dados.preco;

            if (idproduto && nome && quantidade && preco){
                const produto = new ProdutoMOD(idproduto, nome, quantidade, preco);

                produto.atualizar().then(() => {
                    resposta.status(200).json({
                        status: true,
                        mensagem: 'Produto atualizado com sucesso!'
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
                    mensagem: 'Informe adequadamente todos os dados de um produto conforme documentação da API'
                });
            }
        }
        else {
            resposta.status(400).json({
                status: false,
                mensagem: 'Método não permitido ou produto no formato JSON não fornecido! Consulte a documentação da API'
            });
        }
    }

    excluir(requisicao, resposta) {
        resposta.type('application/json');

        if (requisicao.method === 'DELETE' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const idProduto = dados.idproduto;

            if (idProduto) {
                const produto = new ProdutoMOD(idProduto);

                produto.removerDoBanco().then(() => {
                    resposta.status(200).json({
                        status: true,
                        mensagem: 'Produto excluído com sucesso!'
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
                    mensagem: 'Informe o Id do produto adequadamente conforme documentação da API'
                });
            }
        }
        else {
            resposta.status(400).json({
                status: false,
                mensagem: 'Método não permitido ou produto no formato JSON não fornecido! Consulte a documentação da API'
            });
        }
    }

    consultar(requisicao, resposta) {
        resposta.type('application/json');

        if (requisicao.method === 'GET') {
            const produto = new ProdutoMOD();

            produto.consultar('').then((produtos) => {
                resposta.status(200).json(produtos);
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
                mensagem: 'Método não permitido ou produto no formato JSON não fornecido! Consulte a documentação da API'
            });
        }
    }
}