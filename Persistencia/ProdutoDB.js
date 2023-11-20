import ProdutoMOD from "../Modelo/ProdutoMOD.js";
import conectar from "./Conexao.js";

export default class ProdutoDB{
    async incluir(produto){
        if (produto instanceof ProdutoMOD){
            const conexao = await conectar();
            const sql = "INSERT INTO produto (pro_nome, pro_quantidade, pro_preco) \
                         VALUES (?,?,?)";
            const valores = [produto.nome,
                             produto.quantidade,
                             produto.preco];
            await conexao.query(sql, valores);
        }
    }

    async alterar(produto){
        if (produto instanceof ProdutoMOD){
            const conexao = await conectar();
            const sql = "UPDATE produto SET pro_nome=?, pro_quantidade=?, pro_preco=? \
                         WHERE idproduto=?";
            const valores = [produto.nome,
                             produto.quantidade,
                             produto.preco,
                             produto.idproduto];
            await conexao.query(sql, valores);
        }
    }

    async excluir(produto){
        if (produto instanceof ProdutoMOD){
            const conexao = await conectar();
            const sql = "DELETE FROM produto WHERE idproduto=?";
            const valores = [produto.idproduto];
            await conexao.query(sql, valores);
        }
    }

    async consultar(termo){
        const conexao = await conectar();
        const sql = 'SELECT * FROM produto WHERE pro_nome LIKE ?';
        const valores = ['%' + termo + '%'];
        const [rows] = await conexao.query(sql, valores);
        const listaProdutos = [];

        for(const row of rows){
            const produto = new ProdutoMOD(row['idproduto'],
                                           row['pro_nome'],
                                           row['pro_quantidade'],
                                           row['pro_preco']);
            listaProdutos.push(produto);
        }

        return listaProdutos;
    }
}