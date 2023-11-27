const detalhesContainer = document.getElementById('sobre');

document.addEventListener("DOMContentLoaded", function () {
    // Verificar se a senha foi digitada
    const senhaDigitada = localStorage.getItem('senha');

    // Se a senha não foi digitada, redirecionar para a página de login
    if (!senhaDigitada) {
        alert("Não foi possível completar a operação. Faça login primeiro.");
        window.location.href = "pagina-de-login.html"; // Substitua pelo caminho real da sua página de login
        return;
    }

    // Se a senha foi digitada, continuar carregando os detalhes
    obterDetalhes();
});


// Agora, defina as funções relacionadas aos detalhes do atleta
const exibirDetalhes = (dados) => {
    const detalhesImagem = document.createElement("img");
    detalhesImagem.src = dados.imagem;
    detalhesImagem.alt = `foto de ${dados.nome}`;

    detalhesContainer.appendChild(detalhesImagem);

};

const sobre_jogador = () => {
    detalhesContainer.innerHTML =` 

        <p>Nome: ${localStorage.getItem('nome_completo')}</p>
        <p>Nascimento: ${localStorage.getItem('nascimento')}</p>
        <p>Altura: ${localStorage.getItem('altura')}</p>
        <p>Descrição: ${localStorage.getItem('descricao')}</p>

    
    `;
};

sobre_jogador();

const obterDetalhes = async () => {
    const endpoint = `https://botafogo-atletas.mange.li/${localStorage.getItem('id')}`;

    try {
        const resposta = await fetch(endpoint);
        const dados = await resposta.json();

        // Chame a função para exibir os detalhes do atleta
        exibirDetalhes(dados);
    } catch (error) {
        console.error("Erro ao obter detalhes do atleta:", error);
        detalhesContainer.innerHTML = '<p> Houve um problema ao obter os detalhes do jogador. Por favor, tente novamente.</p>';
    }
};


// Adicione o evento DOMContentLoaded
document.addEventListener("DOMContentLoaded", function () {
    // Chame a função para obter os detalhes do atleta quando a página carregar
    obterDetalhes();
});

const voltar = () => {
    const sair = document.querySelector('footer');
  
    const botao_voltar = document.createElement('a');
    botao_voltar.href = 'pagina.html';
    botao_voltar.textContent = 'Voltar';
    botao_voltar.style.color = 'black';
    botao_voltar.style.textDecoration = 'none';
    botao_voltar.style.fontSize = '16px';
    botao_voltar.style.backgroundColor = '#ffff';
    botao_voltar.style.padding = '10px';
    botao_voltar.style.borderRadius = '4px';
    botao_voltar.style.margin = '46%'
  
    sair.appendChild(botao_voltar);
  };
  
  voltar();

