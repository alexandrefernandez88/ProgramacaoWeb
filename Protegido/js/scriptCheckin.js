const endpoint = 'http://localhost:3010/checkins';
let mensagem = document.getElementById('msg');
let mensagemModal = document.getElementById('msgModal');
let formulario = document.getElementById('frmCheckin');

window.onload = carregarPagina;
formulario.onsubmit = salvarCheckin;
document.getElementById('btnAtualizar').onclick = atualizarCheckin;

function carregarPagina(){
    fetch('http://localhost:3010/tiposquartos', {method:"GET"}).then((resposta) => {
        if (resposta.ok){
            return resposta.json();
        }
    }).then((listaTiposQuarto) => {
        carregaSelectTiposQuartos(listaTiposQuarto);
    }).catch((erro) => {
        mensagem.innerHTML = "<br><div class='alert alert-secondary' role='alert'> \
        Não foi possível recuperar os tipos de quarto do backend:" + erro.mensage +
        "</div>";       
    });

    exibirTabelaQuartos();
}

function getCheckin(){
    const datacheckin = document.getElementById('DataCheckin').value;
    const idquarto = document.getElementById('Quarto').value;
    const idcliente = document.getElementById('Cliente').value;

    if (idquarto && idtipoquarto){
        return {
            idquarto: idquarto,
            idtipoquarto: idtipoquarto
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

function salvarQuarto(evento){
    const quarto = getQuarto();
    if (quarto){
        fetch(endpoint, {
            method:'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(quarto)
        }).then((resposta) => {
            if (resposta.ok){
                return resposta.json();
            }
        }).then((dados) => {
            mensagem.innerHTML = "<br><div class='alert alert-success' role='alert'>" +
            dados.mensagem + "</div>";
            document.getElementById('btnFechar').click();
            exibirTabelaQuartos();
        }).catch((erro) => {
            mensagem.innerHTML = "<br><div class='alert alert-danger' role='alert'>" +
            erro.mensagem + "</div>";
        });
    }
    else{
        mensagemModal.innerHTML = "<br><div class='alert alert-danger' role='alert'> \
                              Por favor, informe corretamente os dados do quarto! \
                              </div>";
    }

    evento.preventDefault();
    evento.stopPropagation();
}

function criaTabelaQuartos(listaQuartos){
    let divTabela = document.getElementById('conteudo');

    if (listaQuartos && listaQuartos.length > 0){
        let tabela = document.createElement('table');
        tabela.className = 'table table-striped table-hover';
        let cabecalhoTabela = document.createElement('thead');
        cabecalhoTabela.innerHTML = "<tr> \
                                        <th hidden>Id</th> \
                                        <th style='width: 15%'>Número</th> \
                                        <th style='width: 72%;'>Tipo de Quarto</th> \
                                        <th style='text-align: center; padding-right: 30px;'>Ações</th> \
                                     </tr>";
        tabela.appendChild(cabecalhoTabela);
        let corpoTabela = document.createElement('tbody');
        for (quarto of listaQuartos){
            let linha = document.createElement('tr');
            linha.innerHTML = "<td>" + quarto.idquarto + "</td>" +
                              "<td>" + quarto.tipoquarto + "</td>" +
                              `<td> \
                                    <button class='btn btn-primary' type='button' data-bs-toggle="modal" data-bs-target="#quartoModal" \
                                    onClick="prepararTela('${quarto.idquarto}', '${quarto.idtipoquarto}', 'atualizacao' )">Editar</button> \
                                    <button class='btn btn-danger' type='button' onClick="excluirQuarto('${quarto.idquarto}')">Excluir</button> \
                              </td>`;
            corpoTabela.appendChild(linha);
        }
    
        tabela.appendChild(corpoTabela);
        divTabela.innerHTML = "";
        divTabela.appendChild(tabela);
    }
    else{
        divTabela.innerHTML = "<br><div class='alert alert-secondary' role='alert'> \
                              Não há quartos cadastrados! \
                              </div>";
        limparMensagem();
    }
}

function exibirTabelaQuartos(){
    fetch(endpoint, {method:"GET"}).then((resposta) => {
        if (resposta.ok){
            return resposta.json();
        }
    }).then((listaQuartos) => {
        criaTabelaQuartos(listaQuartos);
    }).catch((erro) => {
        mensagem.innerHTML = "<br><div class='alert alert-secondary' role='alert'> \
        Não foi possível recuperar os quartos do backend:" + erro.mensage +
        "</div>";       
    });
}

function prepararTela(idquarto='', idtipoquarto='', acao=''){
    let botaoCadastrar = document.getElementById('btnSalvar');
    let botaoAtualizar = document.getElementById('btnAtualizar');

    document.getElementById('Numero').value = idquarto;
    document.getElementById('TipoQuarto').value = idtipoquarto;

    if (acao === 'atualizacao'){
        botaoCadastrar.disabled = true;
        botaoAtualizar.disabled = false;
    }
    else {
        botaoCadastrar.disabled = false;
        botaoAtualizar.disabled = true;
    }
}

function excluirQuarto(id){
    if (confirm('Confirma a exclusão do quarto selecionado?')) {
        const quarto = { idquarto : id };
        fetch(endpoint, {
            method: 'DELETE',
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(quarto)
        }).then((resposta)=>{
                if (resposta.ok) {
                    return resposta.json();
                }
        }).then((dados)=>{
                mensagem.innerHTML = "<br><div class='alert alert-success' role='alert'>" +
                    dados.mensagem + "</div>";
                exibirTabelaQuartos();
        }).catch((erro)=>{
                mensagem.innerHTML = "<br><div class='alert alert-danger' role='alert'>" +
                    erro.mensagem + "</div>";
        });
    }
}

function atualizarQuarto(){
    const quarto = getQuarto();
    if (quarto){
        fetch(endpoint, {
            method:'PUT',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(quarto)
        }).then((resposta) => {
            if (resposta.ok){
                return resposta.json();
            }
        }).then((dados) => {
            mensagem.innerHTML = "<br><div class='alert alert-success' role='alert'>" +
            dados.mensagem + "</div>";
            document.getElementById('btnFechar').click();
            prepararTela();
            exibirTabelaQuartos();
        }).catch((erro) => {
            mensagem.innerHTML = "<br><div class='alert alert-danger' role='alert'>" +
            erro.mensagem + "</div>";
        });
    }
    else{
        mensagemModal.innerHTML = "<br><div class='alert alert-danger' role='alert'> \
                              Por favor, informe corretamente os dados do quarto! \
                              </div>";
    }

    evento.preventDefault();
    evento.stopPropagation();
}

function limparMensagem(){
    document.getElementById('msg').innerHTML = '';
}

function carregaSelectTiposQuartos(listaTiposQuarto){
    let selTipoQuarto = document.getElementById('TipoQuarto');

    for (tipoquarto of listaTiposQuarto){
        selTipoQuarto.appendChild(new Option(tipoquarto.nome, tipoquarto.idtipoquarto));
    }
}