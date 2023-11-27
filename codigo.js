document.addEventListener('DOMContentLoaded', function() {
    // Evento de envio do formulário de login
    var loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Impede o envio padrão do formulário

            var senha = document.getElementById('senha').value;
            if (senha === 'BOTAFOGO') {
                // Se a senha estiver correta, salva o estado de login e redireciona
                localStorage.setItem('usuarioLogado', true);
                window.location.href = 'pagina.html'; // Substitua pelo caminho correto da sua página principal
            } else {
                // Exibe uma mensagem de erro se a senha estiver incorreta
                alert('Senha incorreta!');
            }
        });
    }

});
