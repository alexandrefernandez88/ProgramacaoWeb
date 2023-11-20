import FuncionarioMOD from "../Modelo/FuncionarioMOD.js";

export default class FuncionarioCTRL{
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
            const telefone = dados.telefone;
            const email = dados.email;
            const idfuncao = dados.idfuncao

            if (cpf && nome && endereco && bairro && cidade && uf && cep && telefone && email && idfuncao){
                const funcionario = new FuncionarioMOD(null, cpf, nome, endereco, bairro, cidade, uf, cep, telefone, email, idfuncao);

                funcionario.gravar().then(() => {
                    resposta.status(200).json({
                        status: true,
                        mensagem: "Funcionário gravado com sucesso!"
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
                    mensagem: 'Informe adequadamente todos os dados de um funcionário conforme documentação da API'
                });
            }
        }
        else {
            resposta.status(400).json({
                status: false,
                mensagem: 'Método não permitido ou funcionário no formato JSON não fornecido! Consulte a documentação da API'
            });
        }
    }

    atualizar(requisicao, resposta) {
        resposta.type('application/json');

        if (requisicao.method === 'PUT' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const idfuncionario = dados.idfuncionario;
            const cpf = dados.cpf;
            const nome = dados.nome;
            const endereco = dados.endereco;
            const bairro = dados.bairro;
            const cidade = dados.cidade;
            const uf = dados.estado;
            const cep = dados.cep;
            const telefone = dados.telefone;
            const email = dados.email;
            const idfuncao = dados.idfuncao

            if (idfuncionario && cpf && nome && endereco && bairro && cidade && uf && cep && telefone && email && idfuncao){
                const funcionario = new FuncionarioMOD(idfuncionario, cpf, nome, endereco, bairro, cidade, uf, cep, telefone, email, idfuncao);

                funcionario.atualizar().then(() => {
                    resposta.status(200).json({
                        status: true,
                        mensagem: 'Funcionário atualizado com sucesso!'
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
                    mensagem: 'Informe adequadamente todos os dados de um funcionário conforme documentação da API'
                });
            }
        }
        else {
            resposta.status(400).json({
                status: false,
                mensagem: 'Método não permitido ou funcionário no formato JSON não fornecido! Consulte a documentação da API'
            });
        }
    }

    excluir(requisicao, resposta) {
        resposta.type('application/json');

        if (requisicao.method === 'DELETE' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const idFuncionario = dados.idfuncionario;

            if (idFuncionario) {
                const funcionario = new FuncionarioMOD(idFuncionario);

                funcionario.removerDoBanco().then(() => {
                    resposta.status(200).json({
                        status: true,
                        mensagem: 'Funcionário excluído com sucesso!'
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
                    mensagem: 'Informe o cpf do funcionário adequadamente conforme documentação da API'
                });
            }
        }
        else {
            resposta.status(400).json({
                status: false,
                mensagem: 'Método não permitido ou funcionário no formato JSON não fornecido! Consulte a documentação da API'
            });
        }
    }

    consultar(requisicao, resposta) {
        resposta.type('application/json');

        if (requisicao.method === 'GET') {
            const funcionario = new FuncionarioMOD();

            funcionario.consultar('').then((funcionarios) => {
                resposta.status(200).json(funcionarios);
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
                mensagem: 'Método não permitido ou funcionário no formato JSON não fornecido! Consulte a documentação da API'
            });
        }
    }

    consultarPorCPF(requisicao, resposta) {
        resposta.type('application/json');
        const cpf = (requisicao.params['cpf']).substring(0, 3) + '.' + (requisicao.params['cpf']).substring(3, 6) + '.' + (requisicao.params['cpf']).substring(6, 9) + '-' + (requisicao.params['cpf']).substring(9, 11);

        if (requisicao.method === 'GET') {
            const funcionario = new FuncionarioMOD();

            funcionario.consultarCPF(cpf).then((funcionario) => {
                resposta.status(200).json(funcionario);
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
                mensagem: 'Método não permitido ou funcionário no formato JSON não fornecido! Consulte a documentação da API'
            });
        }
    }
}