import ProdutoDB from "../Persistencia/ProdutoDB.js";

export default class ProdutoMOD{
    #idproduto;
    #nome;
    #quantidade;
    #preco;

    constructor(idproduto, nome, quantidade, preco){
        this.#idproduto = idproduto;
        this.#nome = nome;
        this.#quantidade = quantidade;
        this.#preco = preco;
    }

    get idproduto(){
        return this.#idproduto;
    }

    set idproduto(novoId){
        this.#idproduto = novoId;
    }

    get nome(){
        return this.#nome;
    }

    set nome(novoNome){
        if (novoNome != '')
            this.#nome = novoNome;
    }

    get quantidade(){
        return this.#quantidade;
    }

    set quantidade(novaQtde){
        if (novaQtde != '')
            this.#quantidade = novaQtde;
    }

    get preco(){
        return this.#preco;
    }

    set preco(novoPreco){
        if (novoPreco != '')
            this.#preco = novoPreco;
    }

    toJSON(){
        return {
            "idproduto" : this.#idproduto,
            "nome"         : this.#nome,
            "quantidade" : this.#quantidade,
            "preco"     : this.#preco
        }
    }

    async gravar() {
        const produtoDB = new ProdutoDB();
        await produtoDB.incluir(this);
    }

    async atualizar(){
        const produtoDB = new ProdutoDB();
        await produtoDB.alterar(this);
    }

    async removerDoBanco(){
        const produtoDB = new ProdutoDB();
        await produtoDB.excluir(this);
    }

    async consultar(termo){
        const produtoDB = new ProdutoDB();
        const produtos = await produtoDB.consultar(termo);
        return produtos;
    }
}