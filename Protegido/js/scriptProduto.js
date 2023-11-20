const endpoint = 'http://localhost:3010/produtos';
let mensagem = document.getElementById('msg');
let mensagemModal = document.getElementById('msgModal');
let formulario = document.getElementById('frmProduto');

window.onload = exibirTabelaProdutos;
formulario.onsubmit = salvarProduto;
document.getElementById('btnAtualizar').onclick = atualizarProduto;

function getProduto(){
    const idproduto = document.getElementById('idProduto').value;
    const nome = document.getElementById('Nome').value;
    const quantidade = document.getElementById('Quantidade').value;
    const preco = document.getElementById('Preco').value;

    let precoF = preco.replace(',', '.');

    if (nome && quantidade && precoF){
        return {
            idproduto: idproduto,
            nome: nome,
            quantidade: quantidade,
            preco: precoF
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

function salvarProduto(evento){
    const produto = getProduto();
    if (produto){
        fetch(endpoint, {
            method:'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(produto)
        }).then((resposta) => {
            if (resposta.ok){
                return resposta.json();
            }
        }).then((dados) => {
            mensagem.innerHTML = "<br><div class='alert alert-success' role='alert'>" +
            dados.mensagem + "</div>";
            document.getElementById('btnFechar').click();
            exibirTabelaProdutos();
        }).catch((erro) => {
            mensagem.innerHTML = "<br><div class='alert alert-danger' role='alert'>" +
            erro.mensagem + "</div>";
        });
    }
    else{
        mensagemModal.innerHTML = "<br><div class='alert alert-danger' role='alert'> \
                              Por favor, informe corretamente os dados do produto! \
                              </div>";
    }

    evento.preventDefault();
    evento.stopPropagation();
}

function criaTabelaProdutos(listaProdutos){
    let divTabela = document.getElementById('conteudo');

    if (listaProdutos && listaProdutos.length > 0){
        let tabela = document.createElement('table');
        tabela.className = 'table table-striped table-hover';
        let cabecalhoTabela = document.createElement('thead');
        cabecalhoTabela.innerHTML = "<tr> \
                                        <th hidden>Id</th> \
                                        <th style='width: 63%'>Produto</th> \
                                        <th style='width: 13%; text-align: center;'>Quantidade</th> \
                                        <th style='width: 11%; text-align: center; padding-right: 32px;'>Preço</th> \
                                        <th style='text-align: center; padding-right: 30px;'>Ações</th> \
                                     </tr>";
        tabela.appendChild(cabecalhoTabela);
        let corpoTabela = document.createElement('tbody');
        for (produto of listaProdutos){
            let linha = document.createElement('tr');
            let precoF = produto.preco.replace('.', ',');
            linha.innerHTML = "<td id='IdProduto' hidden>" + produto.idproduto + "</td>" +
                              "<td>" + produto.nome + "</td>" +
                              "<td style='text-align: center;'>" + produto.quantidade + "</td>" +
                              "<td style='text-align: right; padding-right: 32px;'>" + precoF + "</td>" +
                              `<td> \
                                    <button class='btn btn-primary' type='button' data-bs-toggle="modal" data-bs-target="#produtoModal" \
                                    onClick="prepararTela('${produto.idproduto}', '${produto.nome}', \
                                    '${produto.quantidade}', '${produto.preco}', 'atualizacao' )">Editar</button> \
                                    <button class='btn btn-danger' type='button' onClick="excluirProduto('${produto.idproduto}')">Excluir</button> \
                              </td>`;
            corpoTabela.appendChild(linha);
        }
    
        tabela.appendChild(corpoTabela);
        divTabela.innerHTML = "";
        divTabela.appendChild(tabela);
    }
    else{
        divTabela.innerHTML = "<br><div class='alert alert-secondary' role='alert'> \
                              Não há produtos cadastrados! \
                              </div>";
        limparMensagem();
    }
}

function exibirTabelaProdutos(){
    fetch(endpoint, {method:"GET"}).then((resposta) => {
        if (resposta.ok){
            return resposta.json();
        }
    }).then((listaProdutos) => {
        criaTabelaProdutos(listaProdutos);
    }).catch((erro) => {
        mensagem.innerHTML = "<br><div class='alert alert-secondary' role='alert'> \
        Não foi possível recuperar os produtos do backend:" + erro.mensage +
        "</div>";       
    });
}

function prepararTela(idproduto='', nome='', quantidade='', preco='', acao=''){
    let botaoCadastrar = document.getElementById('btnSalvar');
    let botaoAtualizar = document.getElementById('btnAtualizar');

    document.getElementById('idProduto').value = idproduto;
    document.getElementById('Nome').value = nome;
    document.getElementById('Quantidade').value = quantidade;
    document.getElementById('Preco').value = preco;

    if (acao === 'atualizacao'){
        botaoCadastrar.disabled = true;
        botaoAtualizar.disabled = false;
    }
    else {
        botaoCadastrar.disabled = false;
        botaoAtualizar.disabled = true;
    }
}

function excluirProduto(id){
    if (confirm('Confirma a exclusão do produto selecionado?')) {
        const produto = { idproduto : id };
        fetch(endpoint, {
            method: 'DELETE',
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(produto)
        }).then((resposta)=>{
                if (resposta.ok) {
                    return resposta.json();
                }
        }).then((dados)=>{
                mensagem.innerHTML = "<br><div class='alert alert-success' role='alert'>" +
                    dados.mensagem + "</div>";
                exibirTabelaProdutos();
        }).catch((erro)=>{
                mensagem.innerHTML = "<br><div class='alert alert-danger' role='alert'>" +
                    erro.mensagem + "</div>";
        });
    }
}

function atualizarProduto(){
    const produto = getProduto();
    if (produto){
        fetch(endpoint, {
            method:'PUT',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(produto)
        }).then((resposta) => {
            if (resposta.ok){
                return resposta.json();
            }
        }).then((dados) => {
            mensagem.innerHTML = "<br><div class='alert alert-success' role='alert'>" +
            dados.mensagem + "</div>";
            document.getElementById('btnFechar').click();
            prepararTela();
            exibirTabelaProdutos();
        }).catch((erro) => {
            mensagem.innerHTML = "<br><div class='alert alert-danger' role='alert'>" +
            erro.mensagem + "</div>";
        });
    }
    else{
        mensagemModal.innerHTML = "<br><div class='alert alert-danger' role='alert'> \
                              Por favor, informe corretamente os dados do produto! \
                              </div>";
    }

    evento.preventDefault();
    evento.stopPropagation();
}

function limparMensagem(){
    document.getElementById('msg').innerHTML = '';
}