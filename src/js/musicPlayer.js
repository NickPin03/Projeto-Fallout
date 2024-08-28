// OBS: Qnd música acaba é pra ir pra próxima música

document.querySelector('.btnStop').style.display = 'none';

let musicas = [
    {titulo:"I don't want to set the world on fire", artista: 'The Ink Spots', src:'music/01. War Never Changes (Intro).mp3', img: 'src/images/musicImg/fallout3.png'},
    {titulo:'Maybe', artista: 'The Ink Spots', src:'music/01. Maybe.mp3', img: 'src/images/musicImg/falloutDisco1.png'}
];

// Eventos
let musica = document.querySelector('audio');
let indexMusica = 0;

let duracaoMusica = document.querySelector('.fim');
let imagemDisco = document.querySelector('.discoIcon');
let nomeMusica = document.querySelector('.description h3');
let nomeArtista = document.querySelector('.artistName');
const btnPlay = document.querySelector('.btnPlay');
const btnStop = document.querySelector('.btnStop');

let animacaoRodando = false;
let anguloAtual = 0; // Armazenar o ângulo atual da rotação do disco
let intervaloRotacao;

renderizarMusica(indexMusica);

document.querySelector('.btnPlay').addEventListener('click', tocarMusica);

document.querySelector('.btnStop').addEventListener('click', pausarMusica);

musica.addEventListener('timeupdate', atualizarBarra);

// Adicionando o evento ended para tocar a próxima música automaticamente
musica.addEventListener('ended', () => {
    indexMusica++;
    if (indexMusica >= musicas.length) {
        indexMusica = 0; // Reinicia a playlist quando chega ao fim
    }
    renderizarMusica(indexMusica);
    tocarMusica(); // Inicia a próxima música automaticamente
});

document.querySelector('.previous').addEventListener('click', () => {
    indexMusica--;
    if (indexMusica < 0) {
        indexMusica = musicas.length - 1;
    }
    renderizarMusica(indexMusica);
})

document.querySelector('.next').addEventListener('click', () => {
    indexMusica++;
    if (indexMusica > 1) {
        indexMusica = 0;
    }
    renderizarMusica(indexMusica); 
})

// Funções
function renderizarMusica(index) {
     // Pausar o disco e parar a animação anterior antes de carregar a nova música
     pausarDisco();
     anguloAtual = 0;
     imagemDisco.style.transform = `rotate(${anguloAtual}deg)`;

     btnPlay.style.display = 'block';  // mostrar o botão de play
     btnStop.style.display = 'none';   // esconder o botão de stop

     const progress = document.querySelector('progress'); // reseta o progresso anterior
     progress.style.width = '0%'; // Define a largura da barra como 0%
     progress.value = 0;

     musica.setAttribute('src', musicas[index].src);
     musica.addEventListener('loadeddata', () => {
     nomeMusica.textContent = musicas[index].titulo;
     nomeArtista.textContent = musicas[index].artista;
     imagemDisco.src = musicas[index].img;
     duracaoMusica.textContent = segundosParaMinutos(Math.floor(musica.duration));
     }); //quando a música carregar execute x função
}

function tocarMusica(){
    musica.play();
    btnStop.style.display= 'block';
    btnPlay.style.display= 'none';

    if (!animacaoRodando) {  // bloco if só executa o código dentro dele se a condição for avaliada como true.
        rodarDisco();
    }
}

function pausarMusica() {
    musica.pause();
    btnStop.style.display= 'none';
    btnPlay.style.display= 'block';

    pausarDisco(); // Pausa a rotação do disco
}

function atualizarBarra() {
    let barra = document.querySelector('progress');
    barra.style.width = (musica.currentTime / musica.duration) * 100 + '%';
    let tempoDecorrido = document.querySelector('.inicio');
    tempoDecorrido.textContent = segundosParaMinutos(Math.floor(musica.currentTime)); // arredonda o valor do número, se for 2.86 irá retornar 3
}

function segundosParaMinutos(segundos) {
    let campoMinutos =  Math.floor(segundos/60); // campo dos minutos. Ex: 12/60 = 0.0.... número quebrado, logo arredonda pra 0. Só passará a valer 1 quando for 60/60, assim por diante
    let campoSegundos = segundos % 60;
    if (campoSegundos < 10) {
        campoSegundos = '0' + campoSegundos;
    }

    return campoMinutos+':'+campoSegundos;
}

function rodarDisco() {
    // Define a rotação contínua do disco
    intervaloRotacao = setInterval(() => {
        anguloAtual += 1; // Incrementa o ângulo
        imagemDisco.style.transform = `rotate(${anguloAtual}deg)`;
    }, 16); // Aproximadamente 60 fps (1000ms / 60 = 16.67ms)

    animacaoRodando = true;
}

function pausarDisco() {
    clearInterval(intervaloRotacao); // Para a rotação
    animacaoRodando = false; // Indica que a animação não está rodando
}