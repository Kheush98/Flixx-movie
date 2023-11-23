'use strict';

const global = {
   currentPage: window.location.pathname
};

// Display 20 most popular movies
async function displayPopularMovies() {
    showSpinner();
    const { results } = await fethAPIData('movie/popular');
    hideSpinner();
    
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
        
        document.querySelector('#popular-movies').appendChild(card);
    });
    
}

// Display 20 most popular tv shows
async function displayPopularShows() {
    showSpinner();
    const { results } = await fethAPIData('tv/popular');
    hideSpinner();
    
    results.forEach(tv => {
        const card = document.createElement('div');
        card.classList.add('card');
        const imgPath = tv.poster_path ? `https://image.tmdb.org/t/p/w500${tv.poster_path}` : 'images/no-image.jpg';

        card.innerHTML = `<a href="tv-details.html?id=${tv.id}">
            <img class="card-img-top" src="${imgPath}" alt="${tv.name}">
          </a>
          <div class="card-body">
            <h5 class="card-title">${tv.name}</h5>
            <p class="card-text">
              <small class="text-muted">Aire Date: ${tv.first_air_date}</small>
            </p>
          </div>`;
        
        document.querySelector('#popular-shows').appendChild(card);
    });
    
}

// Fetch data from TMDB API
async function fethAPIData(endpoint) {
    const API_KEY = '3005a469a8e2786d0b53eca6181e277a';
    const URL_API = 'https://api.themoviedb.org/3/';

    const response = await fetch(`${URL_API}${endpoint}?api_key=${API_KEY}`);

   return response.json();
}

function showSpinner() {
    document.querySelector('.spinner').classList.add('show');
}

function hideSpinner() {
    document.querySelector('.spinner').classList.remove('show');
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
            displayPopularShows();
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