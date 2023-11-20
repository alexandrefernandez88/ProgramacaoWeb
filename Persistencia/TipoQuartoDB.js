import TipoQuartoMOD from "../Modelo/TipoQuartoMOD.js";
import conectar from "./Conexao.js";

export default class TipoQuartoDB{
    async incluir(tipoquarto){
        if (tipoquarto instanceof TipoQuartoMOD){
            const conexao = await conectar();
            const sql = "INSERT INTO tipo_quarto (tpq_nome, tpq_descritivo) \
                         VALUES (?,?)";
            const valores = [tipoquarto.nome,
                             tipoquarto.descritivo];
            await conexao.query(sql, valores);
        }
    }

    async alterar(tipoquarto){
        if (tipoquarto instanceof TipoQuartoMOD){
            const conexao = await conectar();
            const sql = "UPDATE tipo_quarto SET tpq_nome=?, tpq_descritivo=? \
                         WHERE idtipo_quarto=?";
            const valores = [tipoquarto.nome,
                             tipoquarto.descritivo,
                             tipoquarto.idtipoquarto];
            await conexao.query(sql, valores);
        }
    }

    async excluir(tipoquarto){
        if (tipoquarto instanceof TipoQuartoMOD){
            const conexao = await conectar();
            const sql = "DELETE FROM tipo_quarto WHERE idtipo_quarto=?";
            const valores = [tipoquarto.idtipoquarto];
            await conexao.query(sql, valores);
        }
    }

    async consultar(termo){
        const conexao = await conectar();
        const sql = 'SELECT * FROM tipo_quarto WHERE tpq_nome LIKE ?';
        const valores = ['%' + termo + '%'];
        const [rows] = await conexao.query(sql, valores);
        const listaTiposQuarto = [];

        for(const row of rows){
            const tipoquarto = new TipoQuartoMOD(row['idtipo_quarto'],
                                           row['tpq_nome'],
                                           row['tpq_descritivo']);
            listaTiposQuarto.push(tipoquarto);
        }

        return listaTiposQuarto;
    }
}