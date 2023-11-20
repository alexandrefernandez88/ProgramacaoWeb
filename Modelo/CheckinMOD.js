import CheckinDB from "../Persistencia/CheckinDB.js";

export default class CheckinMOD{
    #idhospedagem;
    #datacheckin;
    #idquarto;
    #idcliente;

    constructor(idhospedagem, datacheckin, idquarto, idcliente){
        this.#idhospedagem = idhospedagem;
        this.#datacheckin = datacheckin;
        this.#idquarto = idquarto;
        this.#idcliente = idcliente;
    }

    get idhospedagem(){
        return this.#idhospedagem;
    }

    set idhospedagem(novoId){
        this.#idhospedagem = novoId;
    }

    get datacheckin(){
        return this.#datacheckin;
    }

    set datacheckin(novaData){
        if (novaData != '')
            this.#datacheckin = novaData;
    }

    get idquarto(){
        return this.#idquarto;
    }

    set idquarto(novoId){
        if (novoId != '')
            this.#idquarto = novoId;
    }

    get idcliente(){
        return this.#idcliente;
    }

    set idcliente(novoId){
        if (novoId != '')
            this.#idcliente = novoId;
    }

    toJSON(){
        return {
            "idhospedagem"  : this.#idhospedagem,
            "datacheckin"      : this.#datacheckin,
            "idquarto" : this.#idquarto,
            "idcliente" : this.#idcliente
        }
    }

    async gravar() {
        const checkinDB = new CheckinDB();
        await checkinDB.incluir(this);
    }

    async atualizar(){
        const checkinDB = new CheckinDB();
        await checkinDB.alterar(this);
    }

    async removerDoBanco(){
        const checkinDB = new CheckinDB();
        await checkinDB.excluir(this);
    }

    async consultar(termo){
        const checkinDB = new CheckinDB();
        const checkins = await checkinDB.consultar(termo);
        return checkins;
    }
}