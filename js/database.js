const InserirProblemaFireBase = (descricao, local, fotoBase64, udi) => {
    db.collection("problemas").add({
        descricao: descricao,
        local: local,
        fotoBase64: fotoBase64,
        uid: udi,
        status: "Cadastrado"
    })
        .then(function (docRef) {
            alert("Problema salvo com sucesso!");
        })
        .catch(function (error) {
            console.error("Ocorreu um erro ao incluir o orçamento: ", error);
        });
}

const AlterarProblemaFireBase = (codigoProblema, descricao, local, fotoBase64, uid) => {
    db.collection("problemas").doc(codigoProblema).update({
        descricao: descricao, 
        local: local, 
        fotoBase64: fotoBase64, 
        uid: uid
    }).then(function () {
        alert("Problema " + codigoProblema + " atualizado com sucesso.");
    })
        .catch(function (error) {
            console.error("Ocorreu um erro ao editar problema: ", error);
        });
}

const ListarProblemasUsuarioFirebase = (udi) => {
    db.collection("problemas").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            if (doc.data().uid == udi)
                CarregaTabelaProblemas("meus-problemas-cadastrados", doc.id, doc.data());
        });
    })
        .catch(function (error) {
            console.error("Ocorreu um erro: ", error);
        });
}

const ListarUltimoProblemasCadastrados = (limit = 10) => {
    db.collection("problemas").limit(limit).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            CarregaTabelaProblemas("ultimos-problemas-cadastrados", doc.id, doc.data());
        });
    })
        .catch(function (error) {
            console.error("Ocorreu um erro: ", error);
        });
}

const ListarTodosProblemasCadastrados = () => {
    db.collection("problemas").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            CarregaTabelaProblemas("ultimos-problemas-cadastrados", doc.id, doc.data());
        });
    })
        .catch(function (error) {
            console.error("Ocorreu um erro: ", error);
        });
}

const DeletarProblemaFireBase = (e, id) => {
    db.collection("problemas").doc(id).delete()
        .then(function () {
            alert("Problema " + id + " deletado com sucesso.");
            e.parentElement.parentElement.remove();
        })
        .catch(function (error) {
            console.error("Ocorreu um erro ao excluir: ", error);
        });
}

const AlterarRespostaFirebase = (codigoProblema, resposta, status) => {
    db.collection("problemas").doc(codigoProblema).update({
        resposta: resposta,
        status: status
    }).then(function () {
        alert("Problema " + codigoProblema + " atualizado com sucesso.");
    })
        .catch(function (error) {
            console.error("Ocorreu um erro ao editar problema: ", error);
        });
}

async function VerificaUsuarioPoderPublico(email) {

    let usuarioPublico = Promise.resolve(db.collection("poder-publico").get().then((querySnapshot) => {
        let isUsuarioPublico = false;
        querySnapshot.forEach((doc) => {
            if (doc.data().email === email)
                isUsuarioPublico = true;
        });
        return isUsuarioPublico;
    })
        .catch(function (error) {
            console.error("Ocorreu um erro: ", error);

        }));
    return usuarioPublico;
}

ListarUltimoProblemasCadastrados();