const API_KEY = 'api_key=17dc96e29cd12ff539b859f4c32ef3bc&language=pt-BR';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const URLPesquisa = BASE_URL + '/search/movie?' + API_KEY + '&query=';
const URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;

const form = document.getElementById('form');
const input = document.getElementById('ipt');
const main = document.getElementById('posters');


dados(URL);
async function dados(url) {
    const res = await fetch(url);
    const dado = await res.json();
    console.log(dado.results);
    mostra(dado.results);
}
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const pesquisa = input.value;
    if (pesquisa && pesquisa != '') {
        dados(URLPesquisa + pesquisa);
        pesquisa = '';
    }else{
        window.location.reload();
    }
})

function mostra(dado){

    main.innerHTML = '';

    dado.forEach((filme) => {
        const {title, overview, poster_path, vote_average, id} = filme;

        const display = document.createElement('div');
        display.classList.add('poster');
        display.innerHTML = `
        <img src="${IMG_URL + poster_path}" alt="${title}">
        <div class="info">
            <h3>${title}</h3>
            <span>${vote_average}</span>
        </div>
        <div class="sinopse">
            <h4>Sinópse:</h4>
            <br>
            <p>${overview}</p>
            <button id="${id}">Saiba Mais</button>
        </div>
        `
        main.appendChild(display);

        document.getElementById(id).addEventListener('click', () =>{
            
            let array = [];
            array.push(title);
            array.push(id);
            
            localStorage.filme = JSON.stringify(array);

            window.location.href = 'sobre.html';
        });

    });
    
}

/* 
    
*/
