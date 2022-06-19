const API_KEY = 'api_key=17dc96e29cd12ff539b859f4c32ef3bc&language=pt-BR';
const BASE_URL = 'https://api.themoviedb.org/3';

filme = localStorage.getItem('filme');
array = JSON.parse(filme)

const URL = BASE_URL + '/movie/' + array[1] + '?' + API_KEY;
const URLVideo = BASE_URL + '/movie/' + array[1] +'/videos?' + API_KEY;
const URLProvedores = BASE_URL + '/movie/' + array[1] +'/watch/providers?' + API_KEY;

const main = document.getElementById('main');


dados(URL);
dadosVideo(URLVideo);
dadosProvedor(URLProvedores);

async function dados(url) {
    const res = await fetch(url);
    const dado = await res.json();
    mostra(dado);
}

function mostra(dado){
    document.getElementById('titulo').innerHTML += dado.title;
    document.getElementById('nota').innerHTML += dado.vote_average;
    document.getElementById('estreia').innerHTML += dado.release_date;
    document.getElementById('sinopse').innerHTML += dado.overview;   
}


async function dadosVideo(url){
    const res = await fetch(url);
    const dado = await res.json();
    addVideo(dado.results);
}

function addVideo(dado){

    document.getElementById('video').src = 'https://www.youtube.com/embed/' + dado[0].key
}


async function dadosProvedor(url){
    const res = await fetch(url);
    const dado = await res.json();
    addProvedor(dado.results);
}

function addProvedor(dado){
    a = document.getElementById('link');
    a.href = dado.BR.link;
    a.innerHTML = 'Onde Assistir?'
}