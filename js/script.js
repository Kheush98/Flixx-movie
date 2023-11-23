'use strict';

const global = {
   currentPage: window.location.pathname
};

async function displayPopularMovies() {
    const { results } = await fethAPIData('movie/popular');
    const popularMovies = document.querySelector('#popular-movies');

    results.forEach(movie => {
        const card = document.createElement('div');
        card.classList.add('card');
        const imgPath = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'images/no-image.jpg';

        card.innerHTML = `<a href="movie-details.html?id=${movie.id}">
            <img class="card-img-top" src="${imgPath}" alt="Movie Title">
          </a>
          <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${movie.release_date}</small>
            </p>
          </div>`;
        
        popularMovies.appendChild(card);
    });
    console.log(popularMovies)
}

// Fetch data from TMDB API
async function fethAPIData(endpoint) {
    const API_KEY = '3005a469a8e2786d0b53eca6181e277a';
    const URL_API = 'https://api.themoviedb.org/3/';

    const response = await fetch(`${URL_API}${endpoint}?api_key=${API_KEY}`);
    const data = response.json();

    return data;
}

// Highlight active link
function highlightActiveLink() {
    const links = document.querySelectorAll('.nav-link');

    links.forEach(link => {
        if (link.getAttribute('href') === global.currentPage) {
            link.classList.add('active');
        }
    })
}

// Intit app 
function init() {
    switch (global.currentPage) {
        case '/':
        case '/index.html':
            displayPopularMovies();
            break;
        case '/shows.html':
            console.log('Shows');
            break;
        case '/movie-details.html':
            console.log('Movie Details');
            break;
        case '/tv-details.html':
            console.log('TV Details');
        case '/search.html':
            console.log('Search');
            break;
    }

    highlightActiveLink();
}

document.addEventListener('DOMContentLoaded', init);