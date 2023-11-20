const endpoint = 'http://localhost:3010/tiposquartos';
let mensagem = document.getElementById('msg');
let mensagemModal = document.getElementById('msgModal');
let formulario = document.getElementById('frmTipoQuarto');

window.onload = exibirTabelaTiposQuarto;
formulario.onsubmit = salvarTipoQuarto;
document.getElementById('btnAtualizar').onclick = atualizarTipoQuarto;

function getTipoQuarto(){
    const idtipoquarto = document.getElementById('idTipoQuarto').value;
    const nome = document.getElementById('Nome').value;
    const descritivo = document.getElementById('Descritivo').value;

    if (nome && descritivo){
        return {
            idtipoquarto: idtipoquarto,
            nome: nome,
            descritivo: descritivo
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

function salvarTipoQuarto(evento){
    const tipoquarto = getTipoQuarto();
    if (tipoquarto){
        fetch(endpoint, {
            method:'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(tipoquarto)
        }).then((resposta) => {
            if (resposta.ok){
                return resposta.json();
            }
        }).then((dados) => {
            mensagem.innerHTML = "<br><div class='alert alert-success' role='alert'>" +
            dados.mensagem + "</div>";
            document.getElementById('btnFechar').click();
            exibirTabelaTiposQuarto();
        }).catch((erro) => {
            mensagem.innerHTML = "<br><div class='alert alert-danger' role='alert'>" +
            erro.mensagem + "</div>";
        });
    }
    else{
        mensagemModal.innerHTML = "<br><div class='alert alert-danger' role='alert'> \
                              Por favor, informe corretamente os dados do tipo de quarto! \
                              </div>";
    }

    evento.preventDefault();
    evento.stopPropagation();
}

function criaTabelaTiposQuarto(listaTiposQuarto){
    let divTabela = document.getElementById('conteudo');

    if (listaTiposQuarto && listaTiposQuarto.length > 0){
        let tabela = document.createElement('table');
        tabela.className = 'table table-striped table-hover';
        let cabecalhoTabela = document.createElement('thead');
        cabecalhoTabela.innerHTML = "<tr> \
                                        <th hidden>Id</th> \
                                        <th style='width: 15%'>Nome</th> \
                                        <th style='width: 72%;'>Descritivo</th> \
                                        <th style='text-align: center; padding-right: 30px;'>Ações</th> \
                                     </tr>";
        tabela.appendChild(cabecalhoTabela);
        let corpoTabela = document.createElement('tbody');
        for (tipoquarto of listaTiposQuarto){
            let linha = document.createElement('tr');
            linha.innerHTML = "<td id='IdFuncao' hidden>" + tipoquarto.idtipoquarto + "</td>" +
                              "<td>" + tipoquarto.nome + "</td>" +
                              "<td>" + tipoquarto.descritivo + "</td>" +
                              `<td> \
                                    <button class='btn btn-primary' type='button' data-bs-toggle="modal" data-bs-target="#tipoquartoModal" \
                                    onClick="prepararTela('${tipoquarto.idtipoquarto}', '${tipoquarto.nome}', \
                                    '${tipoquarto.descritivo}', 'atualizacao' )">Editar</button> \
                                    <button class='btn btn-danger' type='button' onClick="excluirTipoQuarto('${tipoquarto.idtipoquarto}')">Excluir</button> \
                              </td>`;
            corpoTabela.appendChild(linha);
        }
    
        tabela.appendChild(corpoTabela);
        divTabela.innerHTML = "";
        divTabela.appendChild(tabela);
    }
    else{
        divTabela.innerHTML = "<br><div class='alert alert-secondary' role='alert'> \
                              Não há tipos de quartos cadastrados! \
                              </div>";
        limparMensagem();
    }
}

function exibirTabelaTiposQuarto(){
    fetch(endpoint, {method:"GET"}).then((resposta) => {
        if (resposta.ok){
            return resposta.json();
        }
    }).then((listaTiposQuarto) => {
        criaTabelaTiposQuarto(listaTiposQuarto);
    }).catch((erro) => {
        mensagem.innerHTML = "<br><div class='alert alert-secondary' role='alert'> \
        Não foi possível recuperar os tipos de quarto do backend:" + erro.mensage +
        "</div>";       
    });
}

function prepararTela(idtipoquarto='', nome='', descritivo='', acao=''){
    let botaoCadastrar = document.getElementById('btnSalvar');
    let botaoAtualizar = document.getElementById('btnAtualizar');

    document.getElementById('idTipoQuarto').value = idtipoquarto;
    document.getElementById('Nome').value = nome;
    document.getElementById('Descritivo').value = descritivo;

    if (acao === 'atualizacao'){
        botaoCadastrar.disabled = true;
        botaoAtualizar.disabled = false;
    }
    else {
        botaoCadastrar.disabled = false;
        botaoAtualizar.disabled = true;
    }
}

function excluirTipoQuarto(id){
    if (confirm('Confirma a exclusão do tipo de quarto selecionado?')) {
        const tipoquarto = { idtipoquarto : id };
        fetch(endpoint, {
            method: 'DELETE',
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(tipoquarto)
        }).then((resposta)=>{
                if (resposta.ok) {
                    return resposta.json();
                }
        }).then((dados)=>{
                mensagem.innerHTML = "<br><div class='alert alert-success' role='alert'>" +
                    dados.mensagem + "</div>";
                exibirTabelaTiposQuarto();
        }).catch((erro)=>{
                mensagem.innerHTML = "<br><div class='alert alert-danger' role='alert'>" +
                    erro.mensagem + "</div>";
        });
    }
}

function atualizarTipoQuarto(){
    const tipoquarto = getTipoQuarto();
    if (tipoquarto){
        fetch(endpoint, {
            method:'PUT',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(tipoquarto)
        }).then((resposta) => {
            if (resposta.ok){
                return resposta.json();
            }
        }).then((dados) => {
            mensagem.innerHTML = "<br><div class='alert alert-success' role='alert'>" +
            dados.mensagem + "</div>";
            document.getElementById('btnFechar').click();
            prepararTela();
            exibirTabelaTiposQuarto();
        }).catch((erro) => {
            mensagem.innerHTML = "<br><div class='alert alert-danger' role='alert'>" +
            erro.mensagem + "</div>";
        });
    }
    else{
        mensagemModal.innerHTML = "<br><div class='alert alert-danger' role='alert'> \
                              Por favor, informe corretamente os dados do tipo de quarto! \
                              </div>";
    }

    evento.preventDefault();
    evento.stopPropagation();
}

function limparMensagem(){
    document.getElementById('msg').innerHTML = '';
}