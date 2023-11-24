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

// Display Movie Details
async function displayMoviesDetails() {
    const movieID = window.location.search.split('=')[1];

    showSpinner();
    const movie = await fethAPIData(`movie/${movieID}`);
    hideSpinner();

    // Display for background image
    displayBackgroundImage('movie', movie.backdrop_path);

    const div = document.createElement('div');
    const imgPath = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'images/no-image.jpg';

    div.innerHTML = `<div class="details-top">
    <div>
      <img src="${imgPath}" alt="${movie.title}" class="card-img-top">
    </div>
    <div>
        <h2>${movie.title}</h2>
        <p>
        <i class="fas fa-star text-primary"></i>
        ${movie.vote_average.toFixed(1)} / 10
        </p>
        <p class="text-muted">Release Date: ${movie.release_date}</p>
        <p>
            ${movie.overview}
        </p>
        <h3>Genres</h3>
        <ul class="list-group">
        ${movie.genres.map(genre => `<li>${genre.name}</li>`).join('')}
        
        </ul>
        <a href="${movie.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
    </div>
  </div>
  <div class="details-bottom">
    <h2>Movie Info</h2>
    <ul>
      <li><span class="text-secondary">Budget:</span> ${movie.budget}</li>
      <li><span class="text-secondary">Revenue:</span> ${movie.revenue}</li>
      <li><span class="text-secondary">Runtime:</span> ${movie.runtime}</li>
      <li><span class="text-secondary">Status:</span> ${movie.status}</li>
    </ul>
    <h4>Production Companies</h4>
    <div class="list-group">
    ${movie.production_companies.map(companie => companie.name).join(', ')}
    </div>
  </div>`;

    document.querySelector('#movie-details').appendChild(div);

}

// Display Shows Details
async function displayShowDetails() {
    const showID = window.location.search.split('=')[1];

    showSpinner();
    const show = await fethAPIData(`tv/${showID}`);
    hideSpinner();

    // Display for background image
    displayBackgroundImage('tv', show.backdrop_path);

    const div = document.createElement('div');
    const imgPath = show.poster_path ? `https://image.tmdb.org/t/p/w500${show.poster_path}` : 'images/no-image.jpg';

    div.innerHTML = `<div class="details-top">
    <div>
      <img src="${imgPath}" alt="${show.name}" class="card-img-top">
    </div>
    <div>
        <h2>${show.name}</h2>
        <p>
        <i class="fas fa-star text-primary"></i>
        ${show.vote_average.toFixed(1)} / 10
        </p>
        <p class="text-muted">Release Date: ${show.first_air_date}</p>
        <p>
            ${show.overview}
        </p>
        <h3>Genres</h3>
        <ul class="list-group">
        ${show.genres.map(genre => `<li>${genre.name}</li>`).join('')}
        
        </ul>
        <a href="${show.homepage}" target="_blank" class="btn">Visit Show Homepage</a>
    </div>
  </div>
  <div class="details-bottom">
    <h2>Show Info</h2>
    <ul>
      <li><span class="text-secondary">Number Of Episodes:</span> ${show.number_of_episodes}</li>
      <li><span class="text-secondary">Number Of Seasons:</span> ${show.number_of_seasons}</li>
      <li><span class="text-secondary">Last Episode To Air:</span> ${show.last_air_date}</li>
      <li><span class="text-secondary">Status:</span> ${show.status}</li>
    </ul>
    <h4>Production Companies</h4>
    <div class="list-group">
    ${show.production_companies.map(companie => companie.name).join(', ')}
    </div>
  </div>`;

    document.querySelector('#show-details').appendChild(div);

}

function displayBackgroundImage(type, image) {
    const div = document.createElement('div');

    div.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${image})`;
    div.style.backgroundSize = 'cover';
    div.style.backgroundRepeat = 'no-repeat';
    div.style.backgroundPosition = 'center';
    div.style.height = '121vh';
    div.style.width = '100vw';
    div.style.top = '0';
    div.style.left = '0';
    div.style.position = 'absolute';
    div.style.zIndex = '-1';
    div.style.opacity = '0.1'


    if (type === 'movie') {
        document.querySelector('#movie-details').appendChild(div);
    } else {
        document.querySelector('#show-details').appendChild(div);
    }
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
            displayMoviesDetails();
            break;
        case '/tv-details.html':
            displayShowDetails();
        case '/search.html':
            console.log('Search');
            break;
    }

    highlightActiveLink();
}

document.addEventListener('DOMContentLoaded', init);