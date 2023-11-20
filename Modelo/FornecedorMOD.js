import FornecedorDB from "../Persistencia/FornecedorDB.js";

export default class FornecedorMOD{
    #idfornecedor;
    #cnpj;
    #razao_social;
    #endereco;
    #bairro;
    #cidade;
    #uf;
    #cep;
    #telefone;
    #email;
    #contato;

    constructor(idfornecedor, cnpj, razao_social, endereco, bairro,
                cidade, uf, cep, telefone, email, contato){
        this.#idfornecedor = idfornecedor;
        this.#cnpj = cnpj;
        this.#razao_social = razao_social;
        this.#endereco = endereco;
        this.#bairro = bairro;
        this.#cidade = cidade;
        this.#uf = uf;
        this.#cep = cep;
        this.#telefone = telefone;
        this.#email = email;
        this.#contato = contato;
    }

    get idfornecedor(){
        return this.#idfornecedor;
    }

    set idfornecedor(novoId){
        this.#idfornecedor = novoId;
    }

    get cnpj(){
        return this.#cnpj;
    }

    set cnpj(novoCnpj){
        if (novoCnpj != '')
            this.#cnpj = novoCnpj;
    }

    get razao_social(){
        return this.#razao_social;
    }

    set razao_social(novaRazao){
        if (novaRazao != '')
            this.#razao_social = novaRazao;
    }

    get endereco(){
        return this.#endereco;
    }

    set endereco(novoEndereco){
        if (novoEndereco != '')
            this.#endereco = novoEndereco;
    }

    get bairro(){
        return this.#bairro;
    }

    set bairro(novoBairro){
        if (novoBairro != '')
            this.#bairro = novoBairro;
    }

    get cidade(){
        return this.#cidade;
    }

    set cidade(novaCidade){
        if (novaCidade != '')
            this.#cidade = novaCidade;
    }

    get uf(){
        return this.#uf;
    }

    set uf(novaUf){
        if (novaUf != '')
            this.#uf = novaUf;
    }

    get cep(){
        return this.#cep;
    }

    set cep(novoCep){
        if (novoCep != '')
            this.#cep = novoCep;
    }

    get telefone(){
        return this.#telefone;
    }

    set telefone(novoTelefone){
        if (novoTelefone != '')
            this.#telefone = novoTelefone;
    }

    get email(){
        return this.#email;
    }

    set email(novoEmail){
        if (novoEmail != '')
            this.#email = novoEmail;
    }

    get contato(){
        return this.#contato;
    }

    set contato(novoContato){
        if (novoContato != '')
            this.#contato = novoContato;
    }

    toJSON(){
        return {
            "idfornecedor" : this.#idfornecedor,
            "cnpj"         : this.#cnpj,
            "razao_social" : this.#razao_social,
            "endereco"     : this.#endereco,
            "bairro"       : this.#bairro,
            "cidade"       : this.#cidade,
            "uf"           : this.#uf,
            "cep"          : this.#cep,
            "telefone"     : this.#telefone,
            "email"        : this.#email,
            "contato"      : this.#contato
        }
    }

    async gravar() {
        const fornecedorDB = new FornecedorDB();
        await fornecedorDB.incluir(this);
    }

    async atualizar(){
        const fornecedorDB = new FornecedorDB();
        await fornecedorDB.alterar(this);
    }

    async removerDoBanco(){
        const fornecedorDB = new FornecedorDB();
        await fornecedorDB.excluir(this);
    }

    async consultar(termo){
        const fornecedorDB = new FornecedorDB();
        const fornecedores = await fornecedorDB.consultar(termo);
        return fornecedores;
    }

    async consultarCNPJ(cnpj){
        const fornecedorDB = new FornecedorDB();
        const fornecedores = await fornecedorDB.consultarCNPJ(cnpj);
        return fornecedores;
    }
}