const endpoint = 'http://localhost:3010/clientes';
let mensagem = document.getElementById('msg');
let mensagemModal = document.getElementById('msgModal');
let formulario = document.getElementById('frmHospede');

window.onload = exibirTabelaClientes;
formulario.onsubmit = salvarCliente;
document.getElementById('btnAtualizar').onclick = atualizarCliente;

function getCliente(){
    const idcliente = document.getElementById('idCliente').value;
    const cpf = document.getElementById('CPF').value;
    const nome = document.getElementById('Nome').value;
    const endereco = document.getElementById('Endereco').value;
    const bairro = document.getElementById('Bairro').value;
    const cidade = document.getElementById('Cidade').value;
    const estado = document.getElementById('Estado').value;
    const cep = document.getElementById('Cep').value;
    const data_nascimento = document.getElementById('DataNascimento').value;
    const telefone = document.getElementById('Telefone').value;
    const email = document.getElementById('Email').value;

    if (cpf && nome && endereco && bairro && cidade && estado && cep && data_nascimento && telefone && email){
        return {
            idcliente: idcliente,
            cpf: cpf,
            nome: nome,
            endereco: endereco,
            bairro: bairro,
            cidade: cidade,
            estado: estado,
            cep: cep,
            data_nascimento: data_nascimento,
            telefone: telefone,
            email: email
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

function salvarCliente(evento){
    const cliente = getCliente();
    if (cliente){
        fetch(endpoint, {
            method:'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(cliente)
        }).then((resposta) => {
            if (resposta.ok){
                return resposta.json();
            }
        }).then((dados) => {
            mensagem.innerHTML = "<br><div class='alert alert-success' role='alert'>" +
            dados.mensagem + "</div>";
            document.getElementById('btnFechar').click();
            exibirTabelaClientes();
        }).catch((erro) => {
            mensagem.innerHTML = "<br><div class='alert alert-danger' role='alert'>" +
            erro.mensagem + "</div>";
        });
    }
    else{
        mensagemModal.innerHTML = "<br><div class='alert alert-danger' role='alert'> \
                              Por favor, informe corretamente os dados do hóspede! \
                              </div>";
    }

    evento.preventDefault();
    evento.stopPropagation();
}

function criaTabelaClientes(listaClientes){
    let divTabela = document.getElementById('conteudo');

    if (listaClientes && listaClientes.length > 0){
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
        for (cliente of listaClientes){
            let linha = document.createElement('tr');
            linha.innerHTML = "<td id='IdCliente' hidden>" + cliente.idcliente + "</td>" +
                              "<td>" + cliente.cpf + "</td>" +
                              "<td>" + cliente.nome + "</td>" +
                              "<td>" + cliente.email + "</td>" +
                              `<td> \
                                    <button class='btn btn-primary' type='button' data-bs-toggle="modal" data-bs-target="#hospedeModal" \
                                    onClick="prepararTela('${cliente.idcliente}', '${cliente.cpf}', \
                                    '${cliente.nome}', '${cliente.endereco}', '${cliente.bairro}', '${cliente.cidade}', \
                                    '${cliente.uf}', '${cliente.cep}', '${cliente.data_nascimento}', '${cliente.telefone}', \
                                    '${cliente.email}', 'atualizacao' )">Editar</button> \
                                    <button class='btn btn-danger' type='button' onClick="excluirCliente('${cliente.idcliente}')">Excluir</button> \
                              </td>`;
            corpoTabela.appendChild(linha);
        }
    
        tabela.appendChild(corpoTabela);
        divTabela.innerHTML = "";
        divTabela.appendChild(tabela);
    }
    else{
        divTabela.innerHTML = "<br><div class='alert alert-secondary' role='alert'> \
                              Não há hóspedes cadastrados! \
                              </div>";
        limparMensagem();
    }
}

function exibirTabelaClientes(){
    fetch(endpoint, {method:"GET"}).then((resposta) => {
        if (resposta.ok){
            return resposta.json();
        }
    }).then((listaClientes) => {
        criaTabelaClientes(listaClientes);
    }).catch((erro) => {
        mensagem.innerHTML = "<br><div class='alert alert-secondary' role='alert'> \
        Não foi possível recuperar os hóspedes do backend:" + erro.mensage +
        "</div>";       
    });
}

function prepararTela(idcliente='', cpf='', nome='', endereco='', bairro='', cidade='', estado='', cep='', data_nascimento='', telefone='', email='', acao=''){
    let botaoCadastrar = document.getElementById('btnSalvar');
    let botaoAtualizar = document.getElementById('btnAtualizar');

    document.getElementById('idCliente').value = idcliente;
    document.getElementById('CPF').value = cpf;
    document.getElementById('Nome').value = nome;
    document.getElementById('Endereco').value = endereco;
    document.getElementById('Bairro').value = bairro;
    document.getElementById('Cidade').value = cidade;
    document.getElementById('Estado').value = estado;
    document.getElementById('Cep').value = cep;
    document.getElementById('DataNascimento').value = dataFormatada(data_nascimento);
    document.getElementById('Telefone').value = telefone;
    document.getElementById('Email').value = email;

    if (acao === 'atualizacao'){
        botaoCadastrar.disabled = true;
        botaoAtualizar.disabled = false;
    }
    else {
        botaoCadastrar.disabled = false;
        botaoAtualizar.disabled = true;
    }
}

function excluirCliente(id){
    if (confirm('Confirma a exclusão do hóspede selecionado?')) {
        const cliente = { idcliente : id };
        fetch(endpoint, {
            method: 'DELETE',
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(cliente)
        }).then((resposta)=>{
                if (resposta.ok) {
                    return resposta.json();
                }
        }).then((dados)=>{
                mensagem.innerHTML = "<br><div class='alert alert-success' role='alert'>" +
                    dados.mensagem + "</div>";
                exibirTabelaClientes();
        }).catch((erro)=>{
                mensagem.innerHTML = "<br><div class='alert alert-danger' role='alert'>" +
                    erro.mensagem + "</div>";
        });
    }
}

function atualizarCliente(){
    const cliente = getCliente();
    if (cliente){
        fetch(endpoint, {
            method:'PUT',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(cliente)
        }).then((resposta) => {
            if (resposta.ok){
                return resposta.json();
            }
        }).then((dados) => {
            mensagem.innerHTML = "<br><div class='alert alert-success' role='alert'>" +
            dados.mensagem + "</div>";
            document.getElementById('btnFechar').click();
            prepararTela();
            exibirTabelaClientes();
        }).catch((erro) => {
            mensagem.innerHTML = "<br><div class='alert alert-danger' role='alert'>" +
            erro.mensagem + "</div>";
        });
    }
    else{
        mensagemModal.innerHTML = "<br><div class='alert alert-danger' role='alert'> \
                              Por favor, informe corretamente os dados do hóspede! \
                              </div>";
    }

    evento.preventDefault();
    evento.stopPropagation();
}

function limparMensagem(){
    document.getElementById('msg').innerHTML = '';
}

function dataFormatada(data){
    var dt = new Date(data),
        dia  = dt.getDate().toString().padStart(2, '0'),
        mes  = (dt.getMonth()+1).toString().padStart(2, '0'),
        ano  = dt.getFullYear();
    return ano+"-"+mes+"-"+dia;
}