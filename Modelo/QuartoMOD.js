import QuartoDB from "../Persistencia/QuartoDB.js";

export default class QuartoMOD{
    #idquarto;
    #estado;
    #idtipoquarto;
    #tipoquarto;

    constructor(idquarto, estado, idtipoquarto, tipoquarto){
        this.#idquarto = idquarto;
        this.#estado = estado;
        this.#idtipoquarto = idtipoquarto;
        this.#tipoquarto = tipoquarto
    }

    get idquarto(){
        return this.#idquarto;
    }

    set idquarto(novoId){
        this.#idquarto = novoId;
    }

    get estado(){
        return this.#estado;
    }

    set estado(novoEstado){
        if (novoEstado != '')
            this.#estado = novoEstado;
    }

    get idtipoquarto(){
        return this.#idtipoquarto;
    }

    set idtipoquarto(novoId){
        if (novoId != '')
            this.#idtipoquarto = novoId;
    }

    get tipoquarto(){
        return this.#tipoquarto;
    }

    set tipoquarto(novoTipo){
        if (novoTipo != '')
            this.#tipoquarto = novoTipo;
    }

    toJSON(){
        return {
            "idquarto"     : this.#idquarto,
            "estado"       : this.#estado,
            "idtipoquarto" : this.#idtipoquarto,
            "tipoquarto"   : this.#tipoquarto
        }
    }

    async gravar() {
        const quartoDB = new QuartoDB();
        await quartoDB.incluir(this);
    }

    async atualizar(){
        const quartoDB = new QuartoDB();
        await quartoDB.alterar(this);
    }

    async removerDoBanco(){
        const quartoDB = new QuartoDB();
        await quartoDB.excluir(this);
    }

    async consultar(termo){
        const quartoDB = new QuartoDB();
        const quartos = await quartoDB.consultar(termo);
        return quartos;
    }
}