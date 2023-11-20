import FuncaoMOD from "../Modelo/FuncaoMOD.js";
import conectar from "./Conexao.js";

export default class FuncaoDB{
    async incluir(funcao){
        if (funcao instanceof FuncaoMOD){
            const conexao = await conectar();
            const sql = "INSERT INTO funcao(fnc_nome, fnc_descricao) \
                         VALUES (?,?)";
            const valores = [funcao.nome,
                             funcao.descricao];
            await conexao.query(sql, valores);
        }
    }

    async alterar(funcao){
        if (funcao instanceof FuncaoMOD){
            const conexao = await conectar();
            const sql = "UPDATE funcao SET fnc_nome=?, fnc_descricao=? \
                         WHERE idfuncao=?";
            const valores = [funcao.nome,
                             funcao.descricao,
                             funcao.idfuncao];
            await conexao.query(sql, valores);
        }
    }

    async excluir(funcao){
        if (funcao instanceof FuncaoMOD){
            const conexao = await conectar();
            const sql = "DELETE FROM funcao WHERE idfuncao=?";
            const valores = [funcao.idfuncao];
            await conexao.query(sql, valores);
        }
    }

    async consultar(termo){
        const conexao = await conectar();
        const sql = 'SELECT * FROM funcao WHERE fnc_nome LIKE ?';
        const valores = ['%' + termo + '%'];
        const [rows] = await conexao.query(sql, valores);
        const listaFuncoes = [];

        for(const row of rows){
            const funcao = new FuncaoMOD(row['idfuncao'],
                                           row['fnc_nome'],
                                           row['fnc_descricao']);
            listaFuncoes.push(funcao);
        }

        return listaFuncoes;
    }
}