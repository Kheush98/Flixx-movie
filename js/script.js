'use strict';

const global = {
   currentPage: window.location.pathname,
   search: {
    term: '',
    type: '',
    page: 1,
    totalPage: 1,
    totalResult: 0
   },
   api: {
    apiKey:'3005a469a8e2786d0b53eca6181e277a',
    apiUrl: 'https://api.themoviedb.org/3/'
   }
};

// Display 20 most popular movies
async function displayPopularMovies() {
    const { results } = await fethAPIData('movie/popular');
    
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
              <small class="text-muted">Sortie: ${movie.release_date}</small>
            </p>
          </div>`;
        
        document.querySelector('#popular-movies').appendChild(card);
    });
    
}

// Display 20 most popular tv shows
async function displayPopularShows() {
    const { results } = await fethAPIData('tv/popular');
    
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

    const movie = await fethAPIData(`movie/${movieID}`);

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
        <p class="text-muted">Date De Sortie: ${movie.release_date}</p>
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
    <h2>Film Info</h2>
    <ul>
      <li><span class="text-secondary">Budget:</span> $${movie.budget}</li>
      <li><span class="text-secondary">Revenue:</span> $${movie.revenue}</li>
      <li><span class="text-secondary">Runtime:</span> $${movie.runtime}</li>
      <li><span class="text-secondary">Status:</span> $${movie.status}</li>
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

    const show = await fethAPIData(`tv/${showID}`);

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
        <p class="text-muted">Date De Sortie: ${show.first_air_date}</p>
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

async function displaySlider() {
    const { results } = await fethAPIData('movie/now_playing');
    
    results.forEach(movie => {
        const div = document.createElement('div');
        div.classList.add('swiper-slide');

        div.innerHTML = `
            <a href="movie-details.html?id=${movie.id}">
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            </a>
            <h4 class="swiper-rating">
            <i class="fas fa-star text-secondary"></i> ${movie.vote_average} / 10
            </h4>
        `;

        document.querySelector('.swiper-wrapper').appendChild(div);

        initSwiper();
    })

}

async function search() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    global.search.type = urlParams.get('type');
    global.search.term = urlParams.get('search-term');

    if (global.search.term !== '' && global.search.term !== null) {
        const { results, total_pages, page, total_results } = await searchAPIData();

        global.search.totalPage = total_pages;
        global.search.page = page;
        global.search.totalResult = total_results;

        if (results.length === 0) {
            showAlert('No results found');
        }

        displaySearchResults(results);

        document.querySelector('#search-term').value = '';

    } else {
        showAlert('Veuillez entrer votre recherche s\'il vous plait');
    }
}

function displaySearchResults(results) {
    // Clear previous result
    document.querySelector('#search-results').innerHTML = '';
    document.querySelector('#search-results-heading').innerHTML = '';
    document.querySelector('#pagination').innerHTML = '';

    results.forEach(result => {
        const div = document.createElement('div');
        div.classList.add('card');

        const imgPath = result.poster_path ? `https://image.tmdb.org/t/p/w500${result.poster_path}` : 'images/no-image.jpg';

        div.innerHTML = `
          <a href="${global.search.type}-details.html?id=${result.id}">
            <img class="card-img-top" src="${imgPath}" alt="${global.search.type === 'movie' ? result.title : result.name}">
          </a>
          <div class="card-body">
            <h5 class="card-title">${
                global.search.type === 'movie' ?
                    result.title : result.name
            }</h5>
            <p class="card-text">
              <small class="text-muted">Sortie: ${global.search.type === 'movie' ? result.release_date : result.first_air_date}</small>
            </p>
          </div>`;

          document.querySelector('#search-results').appendChild(div);
    })

    document.querySelector('#search-results-heading').innerHTML = `
        <h2>${results.length} résultats sur ${global.search.totalResult} pour '${global.search.term}'</h2>
    `;

    displayPagination();
}

// Create and Display Pagination For Search
function displayPagination() {
    const div = document.createElement('div');
    div.classList.add('pagination');

    div.innerHTML = `
        <button class="btn btn-primary" id="prev">Prev</button>
        <button class="btn btn-primary" id="next">Next</button>
        <div class="page-counter">Page ${global.search.page} sur ${global.search.totalPage}</div>
    `;

    document.querySelector('#pagination').appendChild(div);

    if (global.search.page === 1) {
        document.querySelector('#prev').disabled = true;
    } 
    
    if (global.search.page === global.search.totalPage) {
        document.querySelector('#next').disabled = true;
    } 

    document.querySelector('#next').addEventListener('click', async () => {
        global.search.page++;

        const { results, total_pages } = await searchAPIData();

        displaySearchResults(results);
    });

    document.querySelector('#prev').addEventListener('click', async () => {
        global.search.page--;

        const { results, total_pages } = await searchAPIData();

        displaySearchResults(results);
    })
}

function initSwiper() {
    const swiper = new Swiper('.swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        freeMode: true,
        loop:true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false
        },
        breakpoints: {
            500: {
                slidesPerView: 2,
            },
            700: {
                slidesPerView: 3,
            },
            1200: {
                slidesPerView: 4,
            }
        }
    });
}

// Fetch data from TMDB API
async function fethAPIData(endpoint) {
    const API_KEY = global.api.apiKey;
    const URL_API = global.api.apiUrl;

    showSpinner();
    const response = await fetch(`${URL_API}${endpoint}?api_key=${API_KEY}&language=fr-FR`);
    hideSpinner();
    
   return response.json();
}

// Fetch data from TMDB API
async function searchAPIData() {
    const API_KEY = global.api.apiKey;
    const URL_API = global.api.apiUrl; 

    showSpinner();
    const response = await fetch(`${URL_API}search/${global.search.type}?api_key=${API_KEY}&language=fr-FR
    &query=${global.search.term}&page=${global.search.page}`);
    hideSpinner();

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

function showAlert(message, className = 'error') {
    const div = document.createElement('div');
    div.classList.add('alert', className);
    div.appendChild(document.createTextNode(message));
    document.querySelector('#alert').appendChild(div);
}

// Intit app 
function init() {
    switch (global.currentPage) {
        case '/':
        case '/index.html':
            displaySlider();
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
            search();
            break;
    }

    highlightActiveLink();
}

document.addEventListener('DOMContentLoaded', init);