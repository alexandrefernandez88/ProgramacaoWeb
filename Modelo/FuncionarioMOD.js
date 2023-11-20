import FuncionarioDB from "../Persistencia/FuncionarioDB.js";

export default class FuncionarioMOD{
    #idfuncionario;
    #cpf;
    #nome;
    #endereco;
    #bairro;
    #cidade;
    #uf;
    #cep;
    #telefone;
    #email;
    #idfuncao;

    constructor(idfuncionario, cpf, nome, endereco, bairro,
                cidade, uf, cep, telefone, email, idfuncao){
        this.#idfuncionario = idfuncionario;
        this.#cpf = cpf;
        this.#nome = nome;
        this.#endereco = endereco;
        this.#bairro = bairro;
        this.#cidade = cidade;
        this.#uf = uf;
        this.#cep = cep;
        this.#telefone = telefone;
        this.#email = email;
        this.#idfuncao = idfuncao;
    }

    get idfuncionario(){
        return this.#idfuncionario;
    }

    set idfuncionario(novoId){
        this.#idfuncionario = novoId;
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

    get idfuncao(){
        return this.#idfuncao;
    }

    set idfuncao(novoIdFuncao){
        if (novoIdFuncao != '')
            this.#idfuncao = novoIdFuncao
    }

    toJSON(){
        return {
            "idfuncionario" : this.#idfuncionario,
            "cpf"           : this.#cpf,
            "nome"          : this.#nome,
            "endereco"      : this.#endereco,
            "bairro"        : this.#bairro,
            "cidade"        : this.#cidade,
            "uf"            : this.#uf,
            "cep"           : this.#cep,
            "telefone"      : this.#telefone,
            "email"         : this.#email,
            "idfuncao"      : this.#idfuncao
        }
    }

    async gravar() {
        const funcionarioDB = new FuncionarioDB();
        await funcionarioDB.incluir(this);
    }

    async atualizar(){
        const funcionarioDB = new FuncionarioDB();
        await funcionarioDB.alterar(this);
    }

    async removerDoBanco(){
        const funcionarioDB = new FuncionarioDB();
        await funcionarioDB.excluir(this);
    }

    async consultar(termo){
        const funcionarioDB = new FuncionarioDB();
        const funcionarios = await funcionarioDB.consultar(termo);
        return funcionarios;
    }

    async consultarCPF(cpf){
        const funcionarioDB = new FuncionarioDB();
        const funcionario = await funcionarioDB.consultarCPF(cpf);
        return funcionario;
    }
}