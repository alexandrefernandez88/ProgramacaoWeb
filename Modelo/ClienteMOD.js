import ClienteDB from "../Persistencia/ClienteDB.js";

export default class ClienteMOD{
    #idcliente;
    #cpf;
    #nome;
    #endereco;
    #bairro;
    #cidade;
    #uf;
    #cep;
    #data_nascimento;
    #telefone;
    #email;

    constructor(idcliente, cpf, nome, endereco, bairro,
                cidade, uf, cep, data_nascimento, telefone, email){
        this.#idcliente = idcliente;
        this.#cpf = cpf;
        this.#nome = nome;
        this.#endereco = endereco;
        this.#bairro = bairro;
        this.#cidade = cidade;
        this.#uf = uf;
        this.#cep = cep;
        this.#data_nascimento = data_nascimento;
        this.#telefone = telefone;
        this.#email = email;
    }

    get idcliente(){
        return this.#idcliente;
    }

    set idcliente(novoId){
        this.#idcliente = novoId;
    }

    get cpf(){
        return this.#cpf;
    }

    set cpf(novoCpf){
        if (novoCpf != '')
            this.#cpf = novoCpf;
    }

    get nome(){
        return this.#nome;
    }

    set nome(novoNome){
        if (novoNome != '')
            this.#nome = novoNome;
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

    get data_nascimento(){
        return this.#data_nascimento;
    }

    set data_nascimento(novaData){
        if (novaData != '')
            this.#data_nascimento = novaData;
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

    toJSON(){
        return {
            "idcliente"       : this.#idcliente,
            "cpf"             : this.#cpf,
            "nome"            : this.#nome,
            "endereco"        : this.#endereco,
            "bairro"          : this.#bairro,
            "cidade"          : this.#cidade,
            "uf"              : this.#uf,
            "cep"             : this.#cep,
            "data_nascimento" : this.#data_nascimento,
            "telefone"        : this.#telefone,
            "email"           : this.#email
        }
    }

    async gravar() {
        const clienteDB = new ClienteDB();
        await clienteDB.incluir(this);
    }

    async atualizar(){
        const clienteDB = new ClienteDB();
        await clienteDB.alterar(this);
    }

    async removerDoBanco(){
        const clienteDB = new ClienteDB();
        await clienteDB.excluir(this);
    }

    async consultar(termo){
        const clienteDB = new ClienteDB();
        const clientes = await clienteDB.consultar(termo);
        return clientes;
    }

    async consultarCPF(cpf){
        const clienteDB = new ClienteDB();
        const cliente = await clienteDB.consultarCPF(cpf);
        return cliente;
    }
}