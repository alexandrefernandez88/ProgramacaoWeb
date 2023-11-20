import QuartoMOD from "../Modelo/QuartoMOD.js";
import conectar from "./Conexao.js";

export default class QuartoDB{
    async incluir(quarto){
        if (quarto instanceof QuartoMOD){
            const conexao = await conectar();
            const sql = "INSERT INTO quarto (idquarto, idtipo_quarto) \
                         VALUES (?,?)";
            const valores = [quarto.idquarto,
                             quarto.idtipoquarto];
            await conexao.query(sql, valores);
        }
    }

    async alterar(quarto){
        if (quarto instanceof QuartoMOD){
            const conexao = await conectar();
            const sql = "UPDATE quarto SET idtipo_quarto=? \
                         WHERE idquarto=?";
            const valores = [quarto.idtipoquarto,
                             quarto.idquarto];
            await conexao.query(sql, valores);
        }
    }

    async excluir(quarto){
        if (quarto instanceof QuartoMOD){
            const conexao = await conectar();
            const sql = "DELETE FROM quarto WHERE idquarto=?";
            const valores = [quarto.idquarto];
            await conexao.query(sql, valores);
        }
    }

    async consultar(termo){
        const conexao = await conectar();
        const sql = 'SELECT qua.idquarto, qua.qua_estado, qua.idtipo_quarto, tpq.tpq_nome \
                     FROM quarto qua \
                     INNER JOIN tipo_quarto tpq ON tpq.idtipo_quarto = qua.idtipo_quarto';
        const [rows] = await conexao.query(sql);
        const listaQuartos = [];

        for(const row of rows){
            const quarto = new QuartoMOD(row['idquarto'],
                                         row['qua_estado'],
                                         row['idtipo_quarto'],
                                         row['tpq_nome']);
            listaQuartos.push(quarto);
        }

        return listaQuartos;
    }
}