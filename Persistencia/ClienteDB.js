import ClienteMOD from "../Modelo/ClienteMOD.js";
import conectar from "./Conexao.js";

export default class ClienteDB{
    async incluir(cliente){
        if (cliente instanceof ClienteMOD){
            const conexao = await conectar();
            const sql = "INSERT INTO cliente(cli_cpf, cli_nome, cli_endereco, cli_bairro, \
                         cli_cidade, cli_uf, cli_cep, cli_datanasc, cli_telefone, cli_email) \
                         VALUES (?,?,?,?,?,?,?,?,?,?)";
            const valores = [cliente.cpf,
                             cliente.nome,
                             cliente.endereco,
                             cliente.bairro,
                             cliente.cidade,
                             cliente.uf,
                             cliente.cep,
                             cliente.data_nascimento,
                             cliente.telefone,
                             cliente.email];
            await conexao.query(sql, valores);
        }
    }

    async alterar(cliente){
        if (cliente instanceof ClienteMOD){
            const conexao = await conectar();
            const sql = "UPDATE cliente SET cli_cpf=?, cli_nome=?, cli_endereco=?, \
                         cli_bairro=?, cli_cidade=?, cli_uf=?, cli_cep=?, cli_datanasc=?, cli_telefone=?, cli_email=? \
                         WHERE idcliente=?";
            const valores = [cliente.cpf,
                             cliente.nome,
                             cliente.endereco,
                             cliente.bairro,
                             cliente.cidade,
                             cliente.uf,
                             cliente.cep,
                             cliente.data_nascimento,
                             cliente.telefone,
                             cliente.email,
                             cliente.idcliente];
            await conexao.query(sql, valores);
        }
    }

    async excluir(cliente){
        if (cliente instanceof ClienteMOD){
            const conexao = await conectar();
            const sql = "DELETE FROM cliente WHERE idcliente=?";
            const valores = [cliente.idcliente];
            await conexao.query(sql, valores);
        }
    }

    async consultar(termo){
        const conexao = await conectar();
        const sql = 'SELECT * FROM cliente WHERE cli_nome LIKE ?';
        const valores = ['%' + termo + '%'];
        const [rows] = await conexao.query(sql, valores);
        const listaClientes = [];

        for(const row of rows){
            const cliente = new ClienteMOD(row['idcliente'],
                                           row['cli_cpf'],
                                           row['cli_nome'],
                                           row['cli_endereco'],
                                           row['cli_bairro'],
                                           row['cli_cidade'],
                                           row['cli_uf'],
                                           row['cli_cep'],
                                           row['cli_datanasc'],
                                           row['cli_telefone'],
                                           row['cli_email']);
            listaClientes.push(cliente);
        }

        return listaClientes;
    }

    async consultarCPF(cpf){
        const conexao = await conectar();
        const sql = 'SELECT * FROM cliente WHERE cli_cpf = ?';
        const valores = [cpf];
        const [rows] = await conexao.query(sql, valores);
        const listaClientes = [];

        for(const row of rows){
            const cliente = new ClienteMOD(row['idcliente'],
                                           row['cli_cpf'],
                                           row['cli_nome'],
                                           row['cli_endereco'],
                                           row['cli_bairro'],
                                           row['cli_cidade'],
                                           row['cli_uf'],
                                           row['cli_cep'],
                                           row['cli_datanasc'],
                                           row['cli_telefone'],
                                           row['cli_email']);
            listaClientes.push(cliente);
        }

        return listaClientes;
    }
}