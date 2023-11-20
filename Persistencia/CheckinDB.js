import CheckinMOD from "../Modelo/CheckinMOD.js";
import conectar from "./Conexao.js";

export default class CheckinDB{
    async incluir(checkin){
        if (checkin instanceof CheckinMOD){
            const conexao = await conectar();
            const sql = "INSERT INTO hospedagem (data_checkin, idquarto, idcliente) \
                         VALUES (?,?,?)";
            const valores = [checkin.datacheckin,
                             checkin.idquarto,
                             checkin.idcliente];
            await conexao.query(sql, valores);
        }
    }

    async alterar(checkin){
        if (checkin instanceof CheckinMOD){
            const conexao = await conectar();
            const sql = "UPDATE hospedagem SET data_checkin=?, idquarto=?, idcliente=? \
                         WHERE idhospedagem=?";
            const valores = [checkin.datacheckin,
                             checkin.idquarto,
                             checkin.idcliente,
                             checkin.idhospedagem];
            await conexao.query(sql, valores);
        }
    }

    async excluir(checkin){
        if (checkin instanceof CheckinMOD){
            const conexao = await conectar();
            const sql = "DELETE FROM hospedagem WHERE idhospedagem=?";
            const valores = [checkin.idhospedagem];
            await conexao.query(sql, valores);
        }
    }

    async consultar(termo){
        const conexao = await conectar();
        const sql = 'SELECT * FROM hospedagem';
        const [rows] = await conexao.query(sql, valores);
        const listaCheckins = [];

        for(const row of rows){
            const checkin = new CheckinMOD(row['idhospedagem'],
                                           row['data_checkin'],
                                           row['idquarto'],
                                           row['idcliente']);
            listaCheckins.push(checkin);
        }

        return listaCheckins;
    }
}