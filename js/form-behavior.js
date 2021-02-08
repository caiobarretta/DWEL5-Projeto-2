function CadastrarAlterarProblema(event) {
    event.preventDefault();
    let user = JSON.parse(window.localStorage.getItem('user'));
    if (!user) {
        alert("Ocorreu um erro, atualize a página e tente novamente");
        return;
    }

    let id = document.getElementById("form-cadastrar-novo-problema-codigo").value;

    let mensagemDescricao = document.getElementById("form-cadastrar-novo-problema-descricao-mensagem");
    let mensagemLocal = document.getElementById("form-cadastrar-novo-problema-local-mensagem");
    mensagemDescricao.textContent = "";
    mensagemLocal.textContent = "";

    let descricao = document.getElementById("form-cadastrar-novo-problema-descricao").value;
    if (!descricao) {
        mensagemDescricao.textContent = "Campo descrição é obrigatório.";
        return;
    }
    if (descricao.length > 500) {
        mensagemDescricao.textContent = "Campo descrição não pode ser maior que 500 caracteres.";
        return;
    }
    let local = document.getElementById("form-cadastrar-novo-problema-local").value;

    if (!local) {
        mensagemLocal.textContent = "Campo local é obrigatório.";
        return;
    }
    if (local.length > 100) {
        mensagemLocal.textContent = "Campo local não pode ser maior que 100 caracteres.";
        return;
    }
    let foto = document.getElementById("form-cadastrar-novo-problema-foto").files[0];

    if (foto) {
        const reader = new FileReader();
        reader.addEventListener("load", function () {
            fotoBase64 = reader.result;
            document.getElementById("form-cadastrar-novo-problema-foto-atual").src = fotoBase64;
            if (!id) {
                InserirProblemaFireBase(descricao, local, fotoBase64, user.uid);
            }
            else {
                AlterarProblemaFireBase(id, descricao, local, fotoBase64, user.uid);
            }
        }, false);
        reader.readAsDataURL(foto);
    }
    else {
        if (!id) {
            InserirProblemaFireBase(descricao, local, "", user.uid);
        }
        else{
            AlterarProblemaFireBase(id, descricao, local, "", user.uid);
        }
    }
    document.getElementById("form-cadastrar-novo-problema-foto-atual").style.display = "none";
    document.getElementById("form-cadastrar-novo-problema-codigo").value = "";
    document.getElementById("form-cadastrar-novo-problema-descricao").value = "";
    document.getElementById("form-cadastrar-novo-problema-local").value = "";
    document.getElementById("form-cadastrar-novo-problema-foto-atual").src = "";
}

function ListarProblemas(event) {
    let user = JSON.parse(window.localStorage.getItem('user'));
    if (!user) {
        alert("Ocorreu um erro, atualize a página e tente novamente");
        return;
    }
    event.preventDefault();

    if (user.poderPublico) {
        ListarTodosProblemasCadastrados();
    }
    else {
        ListarProblemasUsuarioFirebase(user.uid);
    }
}

function DeletarProblema(event, e, id) {
    event.preventDefault();
    DeletarProblemaFireBase(e, id);
}

function ResponderProblema(event) {
    event.preventDefault();
    let codigoProblema = document.getElementById("form-responder-problema-codigo").value;
    if (!codigoProblema) {
        alert("Ocorreu um erro, feche o pop-up, atualize a página e tente novamente.");
        return;
    }
    let respostaProblema = document.getElementById("form-responder-problema-resposta").value;
    let statusProblema = document.getElementById("form-responder-problema-status").value;
    AlterarRespostaFirebase(codigoProblema, respostaProblema, statusProblema);
}

function ConfiguraModalResponderProblema(event, codigoProblema, status) {
    event.preventDefault();
    document.getElementById("form-responder-problema-codigo").value = codigoProblema;
    document.getElementById("form-responder-problema-status").value = status;

    window.location.assign("#abrirModalResponderProblema");
}

function ConfigurarModalVisualizarResposta(event, codigoProblema, resposta) {
    event.preventDefault();
    document.getElementById("form-visualizar-resposta-codigo").value = codigoProblema;
    document.getElementById("form-visualizar-problema-resposta").value = resposta;
    window.location.assign("#abrirModalVisualizarResposta");
}

function AlterarProblema(event, id, descricao, local, foto){
    event.preventDefault();
    document.getElementById("div-form-cadastrar-novo-problema-codigo").style.display = "";
    document.getElementById("form-cadastrar-novo-problema-codigo").value = id;
    document.getElementById("form-cadastrar-novo-problema-descricao").value = descricao;
    document.getElementById("form-cadastrar-novo-problema-local").value = local;
    document.getElementById("form-cadastrar-novo-problema-foto-atual").src = foto;
    
    window.location.assign("#abrirModalCadastrarNovoProblema");
}