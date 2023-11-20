const endpoint = 'http://localhost:3010/funcoes';
let mensagem = document.getElementById('msg');
let mensagemModal = document.getElementById('msgModal');
let formulario = document.getElementById('frmFuncao');

window.onload = exibirTabelaFuncoes;
formulario.onsubmit = salvarFuncao;
document.getElementById('btnAtualizar').onclick = atualizarFuncao;

function getFuncao(){
    const idfuncao = document.getElementById('idFuncao').value;
    const nome = document.getElementById('Nome').value;
    const descricao = document.getElementById('Descricao').value;

    if (nome && descricao){
        return {
            idfuncao: idfuncao,
            nome: nome,
            descricao: descricao
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

function salvarFuncao(evento){
    const funcao = getFuncao();
    if (funcao){
        fetch(endpoint, {
            method:'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(funcao)
        }).then((resposta) => {
            if (resposta.ok){
                return resposta.json();
            }
        }).then((dados) => {
            mensagem.innerHTML = "<br><div class='alert alert-success' role='alert'>" +
            dados.mensagem + "</div>";
            document.getElementById('btnFechar').click();
            exibirTabelaFuncoes();
        }).catch((erro) => {
            mensagem.innerHTML = "<br><div class='alert alert-danger' role='alert'>" +
            erro.mensagem + "</div>";
        });
    }
    else{
        mensagemModal.innerHTML = "<br><div class='alert alert-danger' role='alert'> \
                              Por favor, informe corretamente os dados da função! \
                              </div>";
    }

    evento.preventDefault();
    evento.stopPropagation();
}

function criaTabelaFuncoes(listaFuncoes){
    let divTabela = document.getElementById('conteudo');

    if (listaFuncoes && listaFuncoes.length > 0){
        let tabela = document.createElement('table');
        tabela.className = 'table table-striped table-hover';
        let cabecalhoTabela = document.createElement('thead');
        cabecalhoTabela.innerHTML = "<tr> \
                                        <th hidden>Id</th> \
                                        <th style='width: 15%'>Função</th> \
                                        <th style='width: 72%;'>Descrição</th> \
                                        <th style='text-align: center; padding-right: 30px;'>Ações</th> \
                                     </tr>";
        tabela.appendChild(cabecalhoTabela);
        let corpoTabela = document.createElement('tbody');
        for (funcao of listaFuncoes){
            let linha = document.createElement('tr');
            linha.innerHTML = "<td id='IdFuncao' hidden>" + funcao.idfuncao + "</td>" +
                              "<td>" + funcao.nome + "</td>" +
                              "<td>" + funcao.descricao + "</td>" +
                              `<td> \
                                    <button class='btn btn-primary' type='button' data-bs-toggle="modal" data-bs-target="#funcaoModal" \
                                    onClick="prepararTela('${funcao.idfuncao}', '${funcao.nome}', \
                                    '${funcao.descricao}', 'atualizacao' )">Editar</button> \
                                    <button class='btn btn-danger' type='button' onClick="excluirFuncao('${funcao.idfuncao}')">Excluir</button> \
                              </td>`;
            corpoTabela.appendChild(linha);
        }
    
        tabela.appendChild(corpoTabela);
        divTabela.innerHTML = "";
        divTabela.appendChild(tabela);
    }
    else{
        divTabela.innerHTML = "<br><div class='alert alert-secondary' role='alert'> \
                              Não há funções cadastradas! \
                              </div>";
        limparMensagem();
    }
}

function exibirTabelaFuncoes(){
    fetch(endpoint, {method:"GET"}).then((resposta) => {
        if (resposta.ok){
            return resposta.json();
        }
    }).then((listaFuncoes) => {
        criaTabelaFuncoes(listaFuncoes);
    }).catch((erro) => {
        mensagem.innerHTML = "<br><div class='alert alert-secondary' role='alert'> \
        Não foi possível recuperar as funções do backend:" + erro.mensage +
        "</div>";       
    });
}

function prepararTela(idfuncao='', nome='', descricao='', acao=''){
    let botaoCadastrar = document.getElementById('btnSalvar');
    let botaoAtualizar = document.getElementById('btnAtualizar');

    document.getElementById('idFuncao').value = idfuncao;
    document.getElementById('Nome').value = nome;
    document.getElementById('Descricao').value = descricao;

    if (acao === 'atualizacao'){
        botaoCadastrar.disabled = true;
        botaoAtualizar.disabled = false;
    }
    else {
        botaoCadastrar.disabled = false;
        botaoAtualizar.disabled = true;
    }
}

function excluirFuncao(id){
    if (confirm('Confirma a exclusão da função selecionada?')) {
        const funcao = { idfuncao : id };
        fetch(endpoint, {
            method: 'DELETE',
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(funcao)
        }).then((resposta)=>{
                if (resposta.ok) {
                    return resposta.json();
                }
        }).then((dados)=>{
                mensagem.innerHTML = "<br><div class='alert alert-success' role='alert'>" +
                    dados.mensagem + "</div>";
                exibirTabelaFuncoes();
        }).catch((erro)=>{
                mensagem.innerHTML = "<br><div class='alert alert-danger' role='alert'>" +
                    erro.mensagem + "</div>";
        });
    }
}

function atualizarFuncao(){
    const funcao = getFuncao();
    if (funcao){
        fetch(endpoint, {
            method:'PUT',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(funcao)
        }).then((resposta) => {
            if (resposta.ok){
                return resposta.json();
            }
        }).then((dados) => {
            mensagem.innerHTML = "<br><div class='alert alert-success' role='alert'>" +
            dados.mensagem + "</div>";
            document.getElementById('btnFechar').click();
            prepararTela();
            exibirTabelaFuncoes();
        }).catch((erro) => {
            mensagem.innerHTML = "<br><div class='alert alert-danger' role='alert'>" +
            erro.mensagem + "</div>";
        });
    }
    else{
        mensagemModal.innerHTML = "<br><div class='alert alert-danger' role='alert'> \
                              Por favor, informe corretamente os dados da função! \
                              </div>";
    }

    evento.preventDefault();
    evento.stopPropagation();
}

function limparMensagem(){
    document.getElementById('msg').innerHTML = '';
}