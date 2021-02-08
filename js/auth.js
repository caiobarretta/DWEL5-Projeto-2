//Verifica usuário Logado.
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        ExibeUsuario(user.email);
        Promise.resolve(VerificaUsuarioPoderPublico(user.email))
            .then(poderPublico => {
                document.getElementById("link-modal-login").style.display = "none";
                document.getElementById("link-modal-criar-conta").style.display = "none";
                document.getElementById("acoes-usuarios").style.display = "";
                document.getElementById("link-modal-logout").style.display = "";
                let storage = { uid: user.uid, poderPublico: poderPublico };
                window.localStorage.setItem('user', JSON.stringify(storage));
                if (poderPublico) {
                    document.getElementById("div-meus-problemas-cadastrados").style.display = "none";
                    document.getElementById("link-modal-cadastrar-novo-problema").style.display = "none";
                    document.getElementById("link-modal-listar-problemas").textContent = "Listar Problemas Cadastrados";
                    document.getElementById("div-ultimos-problemas-cadastrados-h2").textContent = "Problemas cadastrados";
                }
                else {
                    document.getElementById("div-meus-problemas-cadastrados").style.display = "";
                    document.getElementById("link-modal-cadastrar-novo-problema").style.display = "";
                    document.getElementById("div-ultimos-problemas-cadastrados-h2").textContent = "Últimos problemas cadastrados";

                }
            });
    }
    else {

        let acoes = document.getElementById("acoes-usuarios");
        if (acoes) {
            acoes.style.display = "none";
            document.getElementById("acoes-usuarios").style.display = "none";
            document.getElementById("div-meus-problemas-cadastrados").style.display = "none";
            document.getElementById("link-modal-cadastrar-novo-problema").style.display = "none";
            document.getElementById("link-modal-logout").style.display = "none";
        }
        window.localStorage.clear();
        
    }
});

function criarUsuario(event) {
    event.preventDefault();
    let email = document.getElementById("form-signup-email").value;
    let password = document.getElementById("form-signup-senha1").value;
    let passwordConfirm = document.getElementById("form-signup-senha2").value;
    let poderPublico = document.getElementById("form-signup-tipo-usuario").checked;

    if (password != passwordConfirm) {
        alert("A senha não bate com a senha de cofirmação.");
        return;
    }
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function () {
            alert("Usuário criado com sucesso");
            ExibeUsuario(email);
            if (poderPublico)
                InserirUsuarioNaListaDeUsuarioDoPoderPublico(email);
        })
        .catch(function (error) {
            console.error("Ocorreu um erro: " + error.message);
        });

}

function autenticarUsuario(event) {
    event.preventDefault();
    let email = document.getElementById("form-signin-email").value;
    let password = document.getElementById("form-signin-senha").value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function () {
            let user = firebase.auth().currentUser;
            alert("Usuario autenticado com sucesso.");
            ExibeUsuario(user.email);
            window.location.assign("#fechar");
            location.reload();
        })
        .catch(function (error) {
            alert("Ocorreu um erro: " + error.message);
        });
}

function alterarSenha(event) {
    event.preventDefault();

    let email = document.getElementById("form-change-pass-email").value;
    let passwordOld = document.getElementById("form-change-pass-senha-antiga").value;

    firebase.auth().signInWithEmailAndPassword(email, passwordOld)
        .then(function () {
            let password = document.getElementById("form-change-pass-senha1").value;
            let passwordConfirm = document.getElementById("form-change-pass-senha2").value;

            if (password != passwordConfirm) {
                alert("A senha não bate com a senha de cofirmação.");
                return;
            }

            var user = firebase.auth().currentUser;
            user.updatePassword(password).then(function () {
                alert("Senha alterada com sucesso.");
            }).catch(function (error) {
                alert("Ocorreu um erro: " + error.message);
            });

        })
        .catch(function (error) {
            alert("Ocorreu um erro: " + error.message);
        });
}

function deslogarUsuario() {
    if (!firebase.auth().currentUser) {
        return;
    }

    firebase.auth().signOut().then(() => {
        alert("Usuário deslogado com sucesso.");
        let saudacao = document.getElementById("saudacao");
        saudacao.textContent = "";
        let emailChangePass = document.getElementById("form-change-pass-email");
        emailChangePass.value = "";
        document.getElementById("link-modal-login").style.display = "";
        document.getElementById("link-modal-criar-conta").style.display = "";
        window.localStorage.clear();
        location.reload();
    }).catch((error) => {
        alert("Ocorreu um erro: " + error.message);
    });
    
}

function ExibeUsuario(email) {
    let emailChangePass = document.getElementById("form-change-pass-email");
    emailChangePass.value = email;
    let saudacao = document.getElementById("saudacao");
    saudacao.textContent = "Bem Vindo: " + email;
}

function InserirUsuarioNaListaDeUsuarioDoPoderPublico(email) {
    db.collection("poder-publico").add({
        email: email
    })
        .then(function (docRef) {
        })
        .catch(function (error) {
            console.error("Ocorreu um erro ao incluir o poder público: ", error);
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
