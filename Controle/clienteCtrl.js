import ClienteMOD from "../Modelo/ClienteMOD.js";

export default class ClienteCTRL{
    gravar(requisicao, resposta) {
        resposta.type("application/json");

        if (requisicao.method === "POST" && requisicao.is("application/json")){
            const dados = requisicao.body;
            const cpf = dados.cpf;
            const nome = dados.nome;
            const endereco = dados.endereco;
            const bairro = dados.bairro;
            const cidade = dados.cidade;
            const uf = dados.estado;
            const cep = dados.cep;
            const data_nascimento = dados.data_nascimento;
            const telefone = dados.telefone;
            const email = dados.email;

            if (cpf && nome && endereco && bairro && cidade && uf && cep && data_nascimento && telefone && email){
                const cliente = new ClienteMOD(null, cpf, nome, endereco, bairro, cidade, uf, cep, data_nascimento, telefone, email);

                cliente.gravar().then(() => {
                    resposta.status(200).json({
                        status: true,
                        mensagem: "Hóspede gravado com sucesso!"
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
                    mensagem: 'Informe adequadamente todos os dados de um hóspede conforme documentação da API'
                });
            }
        }
        else {
            resposta.status(400).json({
                status: false,
                mensagem: 'Método não permitido ou hóspede no formato JSON não fornecido! Consulte a documentação da API'
            });
        }
    }

    atualizar(requisicao, resposta) {
        resposta.type('application/json');

        if (requisicao.method === 'PUT' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const idcliente = dados.idcliente;
            const cpf = dados.cpf;
            const nome = dados.nome;
            const endereco = dados.endereco;
            const bairro = dados.bairro;
            const cidade = dados.cidade;
            const uf = dados.estado;
            const cep = dados.cep;
            const data_nascimento = dados.data_nascimento;
            const telefone = dados.telefone;
            const email = dados.email;

            if (idcliente && cpf && nome && endereco && bairro && cidade && uf && cep && data_nascimento && telefone && email){
                const cliente = new ClienteMOD(idcliente, cpf, nome, endereco, bairro, cidade, uf, cep, data_nascimento, telefone, email);

                cliente.atualizar().then(() => {
                    resposta.status(200).json({
                        status: true,
                        mensagem: 'Hóspede atualizado com sucesso!'
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
                    mensagem: 'Informe adequadamente todos os dados de um hóspede conforme documentação da API'
                });
            }
        }
        else {
            resposta.status(400).json({
                status: false,
                mensagem: 'Método não permitido ou hóspede no formato JSON não fornecido! Consulte a documentação da API'
            });
        }
    }

    excluir(requisicao, resposta) {
        resposta.type('application/json');

        if (requisicao.method === 'DELETE' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const idCliente = dados.idcliente;

            if (idCliente) {
                const cliente = new ClienteMOD(idCliente);

                cliente.removerDoBanco().then(() => {
                    resposta.status(200).json({
                        status: true,
                        mensagem: 'Hóspede excluído com sucesso!'
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
                    mensagem: 'Informe o cpf do hóspede adequadamente conforme documentação da API'
                });
            }
        }
        else {
            resposta.status(400).json({
                status: false,
                mensagem: 'Método não permitido ou hóspede no formato JSON não fornecido! Consulte a documentação da API'
            });
        }
    }

    consultar(requisicao, resposta) {
        resposta.type('application/json');

        if (requisicao.method === 'GET') {
            const cliente = new ClienteMOD();

            cliente.consultar('').then((clientes) => {
                resposta.status(200).json(clientes);
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
                mensagem: 'Método não permitido ou hóspede no formato JSON não fornecido! Consulte a documentação da API'
            });
        }
    }

    consultarPorCPF(requisicao, resposta) {
        resposta.type('application/json');
        const cpf = (requisicao.params['cpf']).substring(0, 3) + '.' + (requisicao.params['cpf']).substring(3, 6) + '.' + (requisicao.params['cpf']).substring(6, 9) + '-' + (requisicao.params['cpf']).substring(9, 11);

        if (requisicao.method === 'GET') {
            const cliente = new ClienteMOD();

            cliente.consultarCPF(cpf).then((cliente) => {
                resposta.status(200).json(cliente);
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
                mensagem: 'Método não permitido ou hóspede no formato JSON não fornecido! Consulte a documentação da API'
            });
        }
    }
}