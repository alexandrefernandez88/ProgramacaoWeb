import FornecedorMOD from "../Modelo/FornecedorMOD.js";

export default class FornecedorCTRL{
    gravar(requisicao, resposta) {
        resposta.type("application/json");

        if (requisicao.method === "POST" && requisicao.is("application/json")){
            const dados = requisicao.body;
            const cnpj = dados.cnpj;
            const razao_social = dados.razaosocial;
            const endereco = dados.endereco;
            const bairro = dados.bairro;
            const cidade = dados.cidade;
            const uf = dados.estado;
            const cep = dados.cep;
            const telefone = dados.telefone;
            const email = dados.email;
            const contato = dados.contato;

            if (cnpj && razao_social && endereco && bairro && cidade && uf && cep && telefone && email && contato){
                const fornecedor = new FornecedorMOD(null, cnpj, razao_social, endereco, bairro, cidade, uf, cep, telefone, email, contato);

                fornecedor.gravar().then(() => {
                    resposta.status(200).json({
                        status: true,
                        mensagem: "Fornecedor gravado com sucesso!"
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
                    mensagem: 'Informe adequadamente todos os dados de um fornecedor conforme documentação da API'
                });
            }
        }
        else {
            resposta.status(400).json({
                status: false,
                mensagem: 'Método não permitido ou fornecedor no formato JSON não fornecido! Consulte a documentação da API'
            });
        }
    }

    atualizar(requisicao, resposta) {
        resposta.type('application/json');

        if (requisicao.method === 'PUT' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const idfornecedor = dados.idfornecedor;
            const cnpj = dados.cnpj;
            const razaosocial = dados.razaosocial;
            const endereco = dados.endereco;
            const bairro = dados.bairro;
            const cidade = dados.cidade;
            const uf = dados.estado;
            const cep = dados.cep;
            const telefone = dados.telefone;
            const email = dados.email;
            const contato = dados.contato;

            if (idfornecedor && cnpj && razaosocial && endereco && bairro && cidade && uf && cep && telefone && email && contato){
                const fornecedor = new FornecedorMOD(idfornecedor, cnpj, razaosocial, endereco, bairro, cidade, uf, cep, telefone, email, contato);

                fornecedor.atualizar().then(() => {
                    resposta.status(200).json({
                        status: true,
                        mensagem: 'Fornecedor atualizado com sucesso!'
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
                    mensagem: 'Informe adequadamente todos os dados de um fornecedor conforme documentação da API'
                });
            }
        }
        else {
            resposta.status(400).json({
                status: false,
                mensagem: 'Método não permitido ou fornecedor no formato JSON não fornecido! Consulte a documentação da API'
            });
        }
    }

    excluir(requisicao, resposta) {
        resposta.type('application/json');

        if (requisicao.method === 'DELETE' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const idFornecedor = dados.idfornecedor;

            if (idFornecedor) {
                const fornecedor = new FornecedorMOD(idFornecedor);

                fornecedor.removerDoBanco().then(() => {
                    resposta.status(200).json({
                        status: true,
                        mensagem: 'Fornecedor excluído com sucesso!'
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
                    mensagem: 'Informe o cnpj do fornecedor adequadamente conforme documentação da API'
                });
            }
        }
        else {
            resposta.status(400).json({
                status: false,
                mensagem: 'Método não permitido ou fornecedor no formato JSON não fornecido! Consulte a documentação da API'
            });
        }
    }

    consultar(requisicao, resposta) {
        resposta.type('application/json');

        if (requisicao.method === 'GET') {
            const fornecedor = new FornecedorMOD();

            fornecedor.consultar('').then((fornecedores) => {
                resposta.status(200).json(fornecedores);
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
                mensagem: 'Método não permitido ou fornecedor no formato JSON não fornecido! Consulte a documentação da API'
            });
        }
    }

    consultarPorCNPJ(requisicao, resposta) {
        resposta.type('application/json');
        const cnpj = (requisicao.params['cnpj']).substring(0, 2) + '.' + (requisicao.params['cnpj']).substring(2, 5) + '.' + (requisicao.params['cnpj']).substring(5, 8) + '/' + (requisicao.params['cnpj']).substring(8, 12) + '-' + (requisicao.params['cnpj']).substring(12, 14);

        if (requisicao.method === 'GET') {
            const fornecedor = new FornecedorMOD();

            fornecedor.consultarCNPJ(cnpj).then((fornecedor) => {
                resposta.status(200).json(fornecedor);
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
                mensagem: 'Método não permitido ou fornecedor no formato JSON não fornecido! Consulte a documentação da API'
            });
        }
    }
}