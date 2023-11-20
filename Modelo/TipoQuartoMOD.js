import TipoQuartoDB from "../Persistencia/TipoQuartoDB.js";

export default class TipoQuartoMOD{
    #idtipoquarto;
    #nome;
    #descritivo;

    constructor(idtipoquarto, nome, descritivo){
        this.#idtipoquarto = idtipoquarto;
        this.#nome = nome;
        this.#descritivo = descritivo;
    }

    get idtipoquarto(){
        return this.#idtipoquarto;
    }

    set idtipoquarto(novoId){
        this.#idtipoquarto = novoId;
    }

    get nome(){
        return this.#nome;
    }

    set nome(novoNome){
        if (novoNome != '')
            this.#nome = novoNome;
    }

    get descritivo(){
        return this.#descritivo;
    }

    set descritivo(novoDescritivo){
        if (novoDescritivo != '')
            this.#descritivo = novoDescritivo;
    }

    toJSON(){
        return {
            "idtipoquarto"  : this.#idtipoquarto,
            "nome"      : this.#nome,
            "descritivo" : this.#descritivo
        }
    }

    async gravar() {
        const tipoquartoDB = new TipoQuartoDB();
        await tipoquartoDB.incluir(this);
    }

    async atualizar(){
        const tipoquartoDB = new TipoQuartoDB();
        await tipoquartoDB.alterar(this);
    }

    async removerDoBanco(){
        const tipoquartoDB = new TipoQuartoDB();
        await tipoquartoDB.excluir(this);
    }

    async consultar(termo){
        const tipoquartoDB = new TipoQuartoDB();
        const tiposquarto = await tipoquartoDB.consultar(termo);
        return tiposquarto;
    }
}