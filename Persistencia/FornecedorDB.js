import FornecedorMOD from "../Modelo/FornecedorMOD.js";
import conectar from "./Conexao.js";

export default class FornecedorDB{
    async incluir(fornecedor){
        if (fornecedor instanceof FornecedorMOD){
            const conexao = await conectar();
            const sql = "INSERT INTO fornecedor(for_cnpj, for_razao_social, for_endereco, for_bairro, \
                         for_cidade, for_uf, for_cep, for_telefone, for_email, for_contato) \
                         VALUES (?,?,?,?,?,?,?,?,?,?)";
            const valores = [fornecedor.cnpj,
                             fornecedor.razao_social,
                             fornecedor.endereco,
                             fornecedor.bairro,
                             fornecedor.cidade,
                             fornecedor.uf,
                             fornecedor.cep,
                             fornecedor.telefone,
                             fornecedor.email,
                             fornecedor.contato];
            await conexao.query(sql, valores);
        }
    }

    async alterar(fornecedor){
        if (fornecedor instanceof FornecedorMOD){
            const conexao = await conectar();
            const sql = "UPDATE fornecedor SET for_cnpj=?, for_razao_social=?, for_endereco=?, \
                         for_bairro=?, for_cidade=?, for_uf=?, for_cep=?, for_telefone=?, for_email=?, for_contato=? \
                         WHERE idfornecedor=?";
            const valores = [fornecedor.cnpj,
                             fornecedor.razao_social,
                             fornecedor.endereco,
                             fornecedor.bairro,
                             fornecedor.cidade,
                             fornecedor.uf,
                             fornecedor.cep,
                             fornecedor.telefone,
                             fornecedor.email,
                             fornecedor.contato,
                             fornecedor.idfornecedor];
            await conexao.query(sql, valores);
        }
    }

    async excluir(fornecedor){
        if (fornecedor instanceof FornecedorMOD){
            const conexao = await conectar();
            const sql = "DELETE FROM fornecedor WHERE idfornecedor=?";
            const valores = [fornecedor.idfornecedor];
            await conexao.query(sql, valores);
        }
    }

    async consultar(termo){
        const conexao = await conectar();
        const sql = 'SELECT * FROM fornecedor WHERE for_razao_social LIKE ?';
        const valores = ['%' + termo + '%'];
        const [rows] = await conexao.query(sql, valores);
        const listaFornecedores = [];

        for(const row of rows){
            const fornecedor = new FornecedorMOD(row['idfornecedor'],
                                                 row['for_cnpj'],
                                                 row['for_razao_social'],
                                                 row['for_endereco'],
                                                 row['for_bairro'],
                                                 row['for_cidade'],
                                                 row['for_uf'],
                                                 row['for_cep'],
                                                 row['for_telefone'],
                                                 row['for_email'],
                                                 row['for_contato']);
            listaFornecedores.push(fornecedor);
        }

        return listaFornecedores;
    }

    async consultarCNPJ(cnpj){
        const conexao = await conectar();
        const sql = 'SELECT * FROM fornecedor WHERE for_cnpj = ?';
        const valores = [cnpj];
        const [rows] = await conexao.query(sql, valores);
        const listaFornecedores = [];

        for(const row of rows){
            const fornecedor = new FornecedorMOD(row['idfornecedor'],
                                                 row['for_cnpj'],
                                                 row['for_razao_social'],
                                                 row['for_endereco'],
                                                 row['for_bairro'],
                                                 row['for_cidade'],
                                                 row['for_uf'],
                                                 row['for_cep'],
                                                 row['for_telefone'],
                                                 row['for_email'],
                                                 row['for_contato']);
            listaFornecedores.push(fornecedor);
        }

        return listaFornecedores;
    }
}