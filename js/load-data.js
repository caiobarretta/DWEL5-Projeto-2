function CarregaTabelaProblemas(tabelaId, id, data) {
    if (!data) {
        alert("Não há dados para exibir.");
        return;
    }
    let trExistente = document.getElementById(tabelaId + "-tr-" + id);
    if (trExistente)
        return;

    let tr = document.createElement("tr");
    tr.setAttribute("id", tabelaId + "-tr-" + id);
    document.getElementById(tabelaId).appendChild(tr);

    let tdId = document.createElement("td");
    tdId.textContent = id;
    tr.appendChild(tdId);

    let tdDescricao = document.createElement("td");
    tdDescricao.textContent = data.descricao;
    tr.appendChild(tdDescricao);

    let tdLocal = document.createElement("td");
    tdLocal.textContent = data.local;
    tr.appendChild(tdLocal);

    let tdFoto = document.createElement("td");
    let image = new Image();
    image.height = 50;
    image.src = data.fotoBase64;
    tr.appendChild(tdFoto);
    tdFoto.appendChild(image);

    let tdStatus = document.createElement("td");
    tdStatus.textContent = data.status;
    tr.appendChild(tdStatus);
    let user = JSON.parse(window.localStorage.getItem('user'));
    let tdAcao = document.createElement("td");
    tdAcao.setAttribute("style", "text-align: center;");
    if (firebase.auth().currentUser && user) {

        if (user.poderPublico) {
            let inputResponder = document.createElement("input");
            inputResponder.setAttribute("type", "submit");
            inputResponder.setAttribute("value", "Responder Problema");
            inputResponder.setAttribute("onclick", 'ConfiguraModalResponderProblema(event, "' + id + '", "' + data.status + '");');
            inputResponder.setAttribute("style", "width: 100%; float: none;");
            tdAcao.appendChild(inputResponder);
        }
        else if (user.uid == data.uid) {
            let inputUpdate = document.createElement("input");
            inputUpdate.setAttribute("type", "submit");
            inputUpdate.setAttribute("value", "Alterar");
            inputUpdate.setAttribute("onclick", 'AlterarProblema(event, "' + id + '", "' + data.descricao + '", "' + data.local + '","' + data.fotoBase64 + '")');
            inputUpdate.setAttribute("style", "width: 100%; float: none; background: cadetblue;");
            tdAcao.appendChild(inputUpdate);

            let inputDelete = document.createElement("input");
            inputDelete.setAttribute("type", "submit");
            inputDelete.setAttribute("value", "Excluir");
            inputDelete.setAttribute("onclick", 'DeletarProblema(event, this, "' + id + '")');
            inputDelete.setAttribute("style", "width: 100%; float: none; background-color: brown;");
            tdAcao.appendChild(inputDelete);
        }

        tr.appendChild(tdAcao);
    }

    if (data.resposta) {
        let linkVisualizarResposta = document.createElement("a");
        linkVisualizarResposta.textContent = "Visualizar Resposta"
        linkVisualizarResposta.setAttribute("href", "#abrirModalVisualizarResposta");
        linkVisualizarResposta.setAttribute("style", "width: 100%; float: none; border-bottom: black 1px dashed;");
        linkVisualizarResposta.setAttribute("onclick", 'ConfigurarModalVisualizarResposta(event, "' + id + '", "' + data.resposta + '");');
        tdAcao.appendChild(linkVisualizarResposta);
    }

}

