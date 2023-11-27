const urlMasculino = "https://botafogo-atletas.mange.li/masculino";
const urlFeminino = "https://botafogo-atletas.mange.li/feminino";
const urlTodos = "https://botafogo-atletas.mange.li/all";

const cria_cartao = (entrada) => {
    const container_atleta = document.createElement('article');
    container_atleta.style.width = '250px';
    container_atleta.style.backgroundColor = '#777777';
    container_atleta.style.textAlign = 'center';
    container_atleta.style.margin = '20px';

   
    const botao_saiba_mais = document.createElement('div');
    botao_saiba_mais.textContent = 'Saiba Mais';
    botao_saiba_mais.classList.add('Saiba_Mais')
    botao_saiba_mais.style.background = 'yellow'
    botao_saiba_mais.style.color = 'black'
    botao_saiba_mais.onclick = () => {detalhes()};
    const detalhes = () => {window.location.href = "detalhes.html"};



    container_atleta.dataset.id = entrada.id;
    container_atleta.dataset.altura = entrada.altura;
    container_atleta.dataset.nome_completo = entrada.nome_completo;
    container_atleta.dataset.nascimento = entrada.nascimento;
    container_atleta.dataset.descricao = entrada.descricao;
    
    const titulo = document.createElement('h3');
    titulo.innerHTML = entrada.nome;
    const imagem = document.createElement('img');
    imagem.src = entrada.imagem;
    imagem.alt = `foto de ${entrada.nome}`;
    // const descricao = document.createElement('p');
    // descricao.innerHTML = entrada.descricao;

    container_atleta.appendChild(titulo);
    container_atleta.appendChild(imagem);
    container_atleta.appendChild(botao_saiba_mais);    
    // container_atleta.appendChild(descricao);

    container_atleta.onclick = manipulaClick;

    const containerJogadores = document.getElementById('containerDeJogadores');
    containerJogadores.appendChild(container_atleta);
};

const manipulaClick = (e) => {
    const artigo = e.target.closest('article');
    //cookie
    document.cookie = `id=${artigo.dataset.id}`;
    document.cookie = `altura=${artigo.dataset.altura}`;
    document.cookie = `nome_completo=${artigo.dataset.nome_completo}`;
    document.cookie = `nascimento=${artigo.dataset.nascimento}`;

    localStorage.setItem('id', artigo.dataset.id);
    localStorage.setItem('altura', artigo.dataset.altura);
    localStorage.setItem('nome_completo', artigo.dataset.nome_completo);
    localStorage.setItem('nascimento', artigo.dataset.nascimento);
    localStorage.setItem('descricao', artigo.dataset.descricao)

    sessionStorage.setItem('id', artigo.dataset.id);
    sessionStorage.setItem('altura', artigo.dataset.altura);
    sessionStorage.setItem('nome_completo', artigo.dataset.nome_completo);
    sessionStorage.setItem('nascimento', artigo.dataset.nascimento);
    sessionStorage.setItem('dados', JSON.stringify(artigo.dataset))

    

    console.log(acha_cookie('id'));
    console.log(localStorage.getItem('nome_completo'));
    console.log(JSON.parse(sessionStorage.getItem('dados')));

    window.location = `detalhes.html?id=${artigo.dataset.id}`;
}


const pega_json = async (caminho) => {
    const resposta = await fetch(caminho);
    const dados = await resposta.json();
    return dados;
};

// Função para filtrar jogadores
function filtrarJogadores(genero) {
    let url;
    switch (genero) {
        case 'Feminino':
            url = urlFeminino;
            break;
        case 'Masculino':
            url = urlMasculino;
            break;
        default:
            url = urlTodos;
            break;
    }

    limparCartoes();
    pega_json(url).then((jogadores) => {
        jogadores.forEach(cria_cartao);
    });
}

// Função para limpar os cartões existentes
function limparCartoes() {
    const container = document.getElementById('containerDeJogadores');
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}

// Adiciona eventos de clique aos botões após o carregamento do DOM
document.addEventListener('DOMContentLoaded', () => {
    const botaoFeminino = document.getElementById('botaoFeminino');
    const botaoMasculino = document.getElementById('botaoMasculino');
    const botaoTodos = document.getElementById('botaoTodos');
    const seletorGenero = document.getElementById('seletorGenero');

    botaoFeminino.onclick = () => filtrarJogadores('Feminino');
    botaoMasculino.onclick = () => filtrarJogadores('Masculino');
    botaoTodos.onclick = () => filtrarJogadores('Todos');

    seletorGenero.addEventListener('change', () => {
        const generoSelecionado = seletorGenero.value;
        filtrarJogadores(generoSelecionado);
    });
});

console.log('síncrono');
