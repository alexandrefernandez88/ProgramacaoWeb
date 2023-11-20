import FuncionarioMOD from "../Modelo/FuncionarioMOD.js";
import conectar from "./Conexao.js";

export default class FuncionarioDB{
    async incluir(funcionario){
        if (funcionario instanceof FuncionarioMOD){
            const conexao = await conectar();
            const sql = "INSERT INTO funcionario(fun_cpf, fun_nome, fun_endereco, fun_bairro, \
                         fun_cidade, fun_uf, fun_cep, fun_telefone, fun_email, idfuncao) \
                         VALUES (?,?,?,?,?,?,?,?,?,?)";
            const valores = [funcionario.cpf,
                             funcionario.nome,
                             funcionario.endereco,
                             funcionario.bairro,
                             funcionario.cidade,
                             funcionario.uf,
                             funcionario.cep,
                             funcionario.telefone,
                             funcionario.email,
                             funcionario.idfuncao];
            await conexao.query(sql, valores);
        }
    }

    async alterar(funcionario){
        if (funcionario instanceof FuncionarioMOD){
            const conexao = await conectar();
            const sql = "UPDATE funcionario SET fun_cpf=?, fun_nome=?, fun_endereco=?, \
                         fun_bairro=?, fun_cidade=?, fun_uf=?, fun_cep=?, fun_telefone=?, fun_email=?, idfuncao=? \
                         WHERE idfuncionario=?";
            const valores = [funcionario.cpf,
                             funcionario.nome,
                             funcionario.endereco,
                             funcionario.bairro,
                             funcionario.cidade,
                             funcionario.uf,
                             funcionario.cep,
                             funcionario.telefone,
                             funcionario.email,
                             funcionario.idfuncao,
                             funcionario.idfuncionario];
            await conexao.query(sql, valores);
        }
    }

    async excluir(funcionario){
        if (funcionario instanceof FuncionarioMOD){
            const conexao = await conectar();
            const sql = "DELETE FROM funcionario WHERE idfuncionario=?";
            const valores = [funcionario.idfuncionario];
            await conexao.query(sql, valores);
        }
    }

    async consultar(termo){
        const conexao = await conectar();
        const sql = 'SELECT * FROM funcionario WHERE fun_nome LIKE ?';
        const valores = ['%' + termo + '%'];
        const [rows] = await conexao.query(sql, valores);
        const listaFuncionarios = [];

        for(const row of rows){
            const funcionario = new FuncionarioMOD(row['idfuncionario'],
                                           row['fun_cpf'],
                                           row['fun_nome'],
                                           row['fun_endereco'],
                                           row['fun_bairro'],
                                           row['fun_cidade'],
                                           row['fun_uf'],
                                           row['fun_cep'],
                                           row['fun_telefone'],
                                           row['fun_email'],
                                           row['idfuncao']);
            listaFuncionarios.push(funcionario);
        }

        return listaFuncionarios;
    }

    async consultarCPF(cpf){
        const conexao = await conectar();
        const sql = 'SELECT * FROM funcionario WHERE fun_cpf = ?';
        const valores = [cpf];
        const [rows] = await conexao.query(sql, valores);
        const listaFuncionarios = [];

        for(const row of rows){
            const funcionario = new FuncionarioMOD(row['idfuncionario'],
                                           row['fun_cpf'],
                                           row['fun_nome'],
                                           row['fun_endereco'],
                                           row['fun_bairro'],
                                           row['fun_cidade'],
                                           row['fun_uf'],
                                           row['fun_cep'],
                                           row['fun_telefone'],
                                           row['fun_email'],
                                           row['idfuncao']);
            listaFuncionarios.push(funcionario);
        }

        return listaFuncionarios;
    }
}