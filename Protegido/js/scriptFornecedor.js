const endpoint = 'http://localhost:3010/fornecedores';
let mensagem = document.getElementById('msg');
let mensagemModal = document.getElementById('msgModal');
let formulario = document.getElementById('frmFornecedor');

window.onload = exibirTabelaFornecedores;
formulario.onsubmit = salvarFornecedor;
document.getElementById('btnAtualizar').onclick = atualizarFornecedor;

function getFornecedor(){
    const idfornecedor = document.getElementById('idFornecedor').value;
    const cnpj = document.getElementById('CNPJ').value;
    const razaosocial = document.getElementById('RazaoSocial').value;
    const endereco = document.getElementById('Endereco').value;
    const bairro = document.getElementById('Bairro').value;
    const cidade = document.getElementById('Cidade').value;
    const estado = document.getElementById('Estado').value;
    const cep = document.getElementById('Cep').value;
    const telefone = document.getElementById('Telefone').value;
    const contato = document.getElementById('Contato').value;
    const email = document.getElementById('Email').value;

    if (cnpj && razaosocial && endereco && bairro && cidade && estado && cep && telefone && contato && email){
        return {
            idfornecedor: idfornecedor,
            cnpj: cnpj,
            razaosocial: razaosocial,
            endereco: endereco,
            bairro: bairro,
            cidade: cidade,
            estado: estado,
            cep: cep,
            telefone: telefone,
            contato: contato,
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

function salvarFornecedor(evento){
    const fornecedor = getFornecedor();
    if (fornecedor){
        fetch(endpoint, {
            method:'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(fornecedor)
        }).then((resposta) => {
            if (resposta.ok){
                return resposta.json();
            }
        }).then((dados) => {
            mensagem.innerHTML = "<br><div class='alert alert-success' role='alert'>" +
            dados.mensagem + "</div>";
            document.getElementById('btnFechar').click();
            exibirTabelaFornecedores();
        }).catch((erro) => {
            mensagem.innerHTML = "<br><div class='alert alert-danger' role='alert'>" +
            erro.mensagem + "</div>";
        });
    }
    else{
        mensagemModal.innerHTML = "<br><div class='alert alert-danger' role='alert'> \
                              Por favor, informe corretamente os dados do fornecedor! \
                              </div>";
    }

    evento.preventDefault();
    evento.stopPropagation();
}

function criaTabelaFornecedores(listaFornecedores){
    let divTabela = document.getElementById('conteudo');

    if (listaFornecedores && listaFornecedores.length > 0){
        let tabela = document.createElement('table');
        tabela.className = 'table table-striped table-hover';
        let cabecalhoTabela = document.createElement('thead');
        cabecalhoTabela.innerHTML = "<tr> \
                                        <th hidden>Id</th> \
                                        <th>CNPJ</th> \
                                        <th style='width: 39%'>Razão Social</th> \
                                        <th style='width: 36%'>E-mail</th> \
                                        <th>Ações</th> \
                                     </tr>";
        tabela.appendChild(cabecalhoTabela);
        let corpoTabela = document.createElement('tbody');
        for (fornecedor of listaFornecedores){
            let linha = document.createElement('tr');
            linha.innerHTML = "<td id='IdFornecedor' hidden>" + fornecedor.idfornecedor + "</td>" +
                              "<td>" + fornecedor.cnpj + "</td>" +
                              "<td>" + fornecedor.razao_social + "</td>" +
                              "<td>" + fornecedor.email + "</td>" +
                              `<td> \
                                    <button class='btn btn-primary' type='button' data-bs-toggle="modal" data-bs-target="#fornecedorModal" \
                                    onClick="prepararTela('${fornecedor.idfornecedor}', '${fornecedor.cnpj}', \
                                    '${fornecedor.razao_social}', '${fornecedor.endereco}', '${fornecedor.bairro}', '${fornecedor.cidade}', \
                                    '${fornecedor.uf}', '${fornecedor.cep}', '${fornecedor.telefone}', '${fornecedor.contato}', \
                                    '${fornecedor.email}', 'atualizacao' )">Editar</button> \
                                    <button class='btn btn-danger' type='button' onClick="excluirFornecedor('${fornecedor.idfornecedor}')">Excluir</button> \
                              </td>`;
            corpoTabela.appendChild(linha);
        }
    
        tabela.appendChild(corpoTabela);
        divTabela.innerHTML = "";
        divTabela.appendChild(tabela);
    }
    else{
        divTabela.innerHTML = "<br><div class='alert alert-secondary' role='alert'> \
                              Não há fornecedores cadastrados! \
                              </div>";
        limparMensagem();
    }
}

function exibirTabelaFornecedores(){
    fetch(endpoint, {method:"GET"}).then((resposta) => {
        if (resposta.ok){
            return resposta.json();
        }
    }).then((listaFornecedores) => {
        criaTabelaFornecedores(listaFornecedores);
    }).catch((erro) => {
        mensagem.innerHTML = "<br><div class='alert alert-secondary' role='alert'> \
        Não foi possível recuperar os fornecedores do backend:" + erro.mensage +
        "</div>";       
    });
}

function prepararTela(idfornecedor='', cnpj='', razaosocial='', endereco='', bairro='', cidade='', estado='', cep='', telefone='', contato='', email='', acao=''){
    let botaoCadastrar = document.getElementById('btnSalvar');
    let botaoAtualizar = document.getElementById('btnAtualizar');

    document.getElementById('idFornecedor').value = idfornecedor;
    document.getElementById('CNPJ').value = cnpj;
    document.getElementById('RazaoSocial').value = razaosocial;
    document.getElementById('Endereco').value = endereco;
    document.getElementById('Bairro').value = bairro;
    document.getElementById('Cidade').value = cidade;
    document.getElementById('Estado').value = estado;
    document.getElementById('Cep').value = cep;
    document.getElementById('Telefone').value = telefone;
    document.getElementById('Contato').value = contato;
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

function excluirFornecedor(id){
    if (confirm('Confirma a exclusão do fornecedor selecionado?')) {
        const fornecedor = { idfornecedor : id };
        fetch(endpoint, {
            method: 'DELETE',
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(fornecedor)
        }).then((resposta)=>{
                if (resposta.ok) {
                    return resposta.json();
                }
        }).then((dados)=>{
                mensagem.innerHTML = "<br><div class='alert alert-success' role='alert'>" +
                    dados.mensagem + "</div>";
                exibirTabelaFornecedores();
        }).catch((erro)=>{
                mensagem.innerHTML = "<br><div class='alert alert-danger' role='alert'>" +
                    erro.mensagem + "</div>";
        });
    }
}

function atualizarFornecedor(){
    const fornecedor = getFornecedor();
    if (fornecedor){
        fetch(endpoint, {
            method:'PUT',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(fornecedor)
        }).then((resposta) => {
            if (resposta.ok){
                return resposta.json();
            }
        }).then((dados) => {
            mensagem.innerHTML = "<br><div class='alert alert-success' role='alert'>" +
            dados.mensagem + "</div>";
            document.getElementById('btnFechar').click();
            prepararTela();
            exibirTabelaFornecedores();
        }).catch((erro) => {
            mensagem.innerHTML = "<br><div class='alert alert-danger' role='alert'>" +
            erro.mensagem + "</div>";
        });
    }
    else{
        mensagemModal.innerHTML = "<br><div class='alert alert-danger' role='alert'> \
                              Por favor, informe corretamente os dados do fornecedor! \
                              </div>";
    }

    evento.preventDefault();
    evento.stopPropagation();
}

function limparMensagem(){
    document.getElementById('msg').innerHTML = '';
}