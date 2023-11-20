import FuncaoDB from "../Persistencia/FuncaoDB.js";

export default class FuncaoMOD{
    #idfuncao;
    #nome;
    #descricao;

    constructor(idfuncao, nome, descricao){
        this.#idfuncao = idfuncao;
        this.#nome = nome;
        this.#descricao = descricao;
    }

    get idfuncao(){
        return this.#idfuncao;
    }

    set idfuncao(novoId){
        this.#idfuncao = novoId;
    }

    get nome(){
        return this.#nome;
    }

    set nome(novoNome){
        if (novoNome != '')
            this.#nome = novoNome;
    }

    get descricao(){
        return this.#descricao;
    }

    set descricao(novaDescricao){
        if (novaDescricao != '')
            this.#descricao = novaDescricao;
    }

    toJSON(){
        return {
            "idfuncao"  : this.#idfuncao,
            "nome"      : this.#nome,
            "descricao" : this.#descricao
        }
    }

    async gravar() {
        const funcaoDB = new FuncaoDB();
        await funcaoDB.incluir(this);
    }

    async atualizar(){
        const funcaoDB = new FuncaoDB();
        await funcaoDB.alterar(this);
    }

    async removerDoBanco(){
        const funcaoDB = new FuncaoDB();
        await funcaoDB.excluir(this);
    }

    async consultar(termo){
        const funcaoDB = new FuncaoDB();
        const funcoes = await funcaoDB.consultar(termo);
        return funcoes;
    }
}