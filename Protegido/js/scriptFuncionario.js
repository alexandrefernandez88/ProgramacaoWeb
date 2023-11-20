const endpoint = 'http://localhost:3010/funcionarios';
let mensagem = document.getElementById('msg');
let mensagemModal = document.getElementById('msgModal');
let formulario = document.getElementById('frmFuncionario');

window.onload = carregarPagina;
formulario.onsubmit = salvarFuncionario;
document.getElementById('btnAtualizar').onclick = atualizarFuncionario;

function carregarPagina(){
    fetch('http://localhost:3010/funcoes', {method:"GET"}).then((resposta) => {
        if (resposta.ok){
            return resposta.json();
        }
    }).then((listaFuncoes) => {
        carregaSelectFuncoes(listaFuncoes);
    }).catch((erro) => {
        mensagem.innerHTML = "<br><div class='alert alert-secondary' role='alert'> \
        Não foi possível recuperar as funções do backend:" + erro.mensage +
        "</div>";       
    });

    exibirTabelaFuncionarios();
}

function getFuncionario(){
    const idfuncionario = document.getElementById('idFuncionario').value;
    const cpf = document.getElementById('CPF').value;
    const nome = document.getElementById('Nome').value;
    const endereco = document.getElementById('Endereco').value;
    const bairro = document.getElementById('Bairro').value;
    const cidade = document.getElementById('Cidade').value;
    const estado = document.getElementById('Estado').value;
    const cep = document.getElementById('Cep').value;
    const telefone = document.getElementById('Telefone').value;
    const email = document.getElementById('Email').value;
    const idfuncao = document.getElementById('Funcao').value;

    if (cpf && nome && endereco && bairro && cidade && estado && cep && telefone && email && idfuncao){
        return {
            idfuncionario: idfuncionario,
            cpf: cpf,
            nome: nome,
            endereco: endereco,
            bairro: bairro,
            cidade: cidade,
            estado: estado,
            cep: cep,
            telefone: telefone,
            email: email,
            idfuncao: idfuncao
        }
    }
    else{
        return undefined;
    }
}

function limpaFormulario(){
    prepararTela();
    limparMensagem();
}

function salvarFuncionario(evento){
    const funcionario = getFuncionario();
    if (funcionario){
        fetch(endpoint, {
            method:'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(funcionario)
        }).then((resposta) => {
            if (resposta.ok){
                return resposta.json();
            }
        }).then((dados) => {
            mensagem.innerHTML = "<br><div class='alert alert-success' role='alert'>" +
            dados.mensagem + "</div>";
            document.getElementById('btnFechar').click();
            exibirTabelaFuncionarios();
        }).catch((erro) => {
            mensagem.innerHTML = "<br><div class='alert alert-danger' role='alert'>" +
            erro.mensagem + "</div>";
        });
    }
    else{
        mensagemModal.innerHTML = "<br><div class='alert alert-danger' role='alert'> \
                              Por favor, informe corretamente os dados do funcionário! \
                              </div>";
    }

    evento.preventDefault();
    evento.stopPropagation();
}

function criaTabelaFuncionarios(listaFuncionarios){
    let divTabela = document.getElementById('conteudo');

    if (listaFuncionarios && listaFuncionarios.length > 0){
        let tabela = document.createElement('table');
        tabela.className = 'table table-striped table-hover';
        let cabecalhoTabela = document.createElement('thead');
        cabecalhoTabela.innerHTML = "<tr> \
                                        <th hidden>Id</th> \
                                        <th>CPF</th> \
                                        <th style='width: 39%'>Nome</th> \
                                        <th style='width: 36%'>E-mail</th> \
                                        <th>Ações</th> \
                                     </tr>";
        tabela.appendChild(cabecalhoTabela);
        let corpoTabela = document.createElement('tbody');
        for (funcionario of listaFuncionarios){
            let linha = document.createElement('tr');
            linha.innerHTML = "<td id='IdFuncionario' hidden>" + funcionario.idfuncionario + "</td>" +
                              "<td>" + funcionario.cpf + "</td>" +
                              "<td>" + funcionario.nome + "</td>" +
                              "<td>" + funcionario.email + "</td>" +
                              `<td> \
                                    <button class='btn btn-primary' type='button' data-bs-toggle="modal" data-bs-target="#funcionarioModal" \
                                    onClick="prepararTela('${funcionario.idfuncionario}', '${funcionario.cpf}', \
                                    '${funcionario.nome}', '${funcionario.endereco}', '${funcionario.bairro}', '${funcionario.cidade}', \
                                    '${funcionario.uf}', '${funcionario.cep}', '${funcionario.telefone}', \
                                    '${funcionario.email}', '${funcionario.idfuncao}', 'atualizacao' )">Editar</button> \
                                    <button class='btn btn-danger' type='button' onClick="excluirFuncionario('${funcionario.idfuncionario}')">Excluir</button> \
                              </td>`;
            corpoTabela.appendChild(linha);
        }
    
        tabela.appendChild(corpoTabela);
        divTabela.innerHTML = "";
        divTabela.appendChild(tabela);
    }
    else{
        divTabela.innerHTML = "<br><div class='alert alert-secondary' role='alert'> \
                              Não há funcionários cadastrados! \
                              </div>";
        limparMensagem();
    }
}

function exibirTabelaFuncionarios(){
    fetch(endpoint, {method:"GET"}).then((resposta) => {
        if (resposta.ok){
            return resposta.json();
        }
    }).then((listaFuncionarios) => {
        criaTabelaFuncionarios(listaFuncionarios);
    }).catch((erro) => {
        mensagem.innerHTML = "<br><div class='alert alert-secondary' role='alert'> \
        Não foi possível recuperar os funcionários do backend:" + erro.mensage +
        "</div>";       
    });
}

function prepararTela(idfuncionario='', cpf='', nome='', endereco='', bairro='', cidade='', estado='', cep='', telefone='', email='', idfuncao='', acao=''){
    let botaoCadastrar = document.getElementById('btnSalvar');
    let botaoAtualizar = document.getElementById('btnAtualizar');

    document.getElementById('idFuncionario').value = idfuncionario;
    document.getElementById('CPF').value = cpf;
    document.getElementById('Nome').value = nome;
    document.getElementById('Endereco').value = endereco;
    document.getElementById('Bairro').value = bairro;
    document.getElementById('Cidade').value = cidade;
    document.getElementById('Estado').value = estado;
    document.getElementById('Cep').value = cep;
    document.getElementById('Telefone').value = telefone;
    document.getElementById('Email').value = email;
    document.getElementById('Funcao').value = idfuncao;

    if (acao === 'atualizacao'){
        botaoCadastrar.disabled = true;
        botaoAtualizar.disabled = false;
    }
    else {
        botaoCadastrar.disabled = false;
        botaoAtualizar.disabled = true;
    }
}

function excluirFuncionario(id){
    if (confirm('Confirma a exclusão do funcionário selecionado?')) {
        const funcionario = { idfuncionario : id };
        fetch(endpoint, {
            method: 'DELETE',
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(funcionario)
        }).then((resposta)=>{
                if (resposta.ok) {
                    return resposta.json();
                }
        }).then((dados)=>{
                mensagem.innerHTML = "<br><div class='alert alert-success' role='alert'>" +
                    dados.mensagem + "</div>";
                exibirTabelaFuncionarios();
        }).catch((erro)=>{
                mensagem.innerHTML = "<br><div class='alert alert-danger' role='alert'>" +
                    erro.mensagem + "</div>";
        });
    }
}

function atualizarFuncionario(){
    const funcionario = getFuncionario();
    if (funcionario){
        fetch(endpoint, {
            method:'PUT',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(funcionario)
        }).then((resposta) => {
            if (resposta.ok){
                return resposta.json();
            }
        }).then((dados) => {
            mensagem.innerHTML = "<br><div class='alert alert-success' role='alert'>" +
            dados.mensagem + "</div>";
            document.getElementById('btnFechar').click();
            prepararTela();
            exibirTabelaFuncionarios();
        }).catch((erro) => {
            mensagem.innerHTML = "<br><div class='alert alert-danger' role='alert'>" +
            erro.mensagem + "</div>";
        });
    }
    else{
        mensagemModal.innerHTML = "<br><div class='alert alert-danger' role='alert'> \
                              Por favor, informe corretamente os dados do funcionário! \
                              </div>";
    }

    evento.preventDefault();
    evento.stopPropagation();
}

function limparMensagem(){
    document.getElementById('msg').innerHTML = '';
}

function carregaSelectFuncoes(listaFuncoes){
    let selFuncao = document.getElementById('Funcao');

    for (funcao of listaFuncoes){
        selFuncao.appendChild(new Option(funcao.nome, funcao.idfuncao));
    }
}