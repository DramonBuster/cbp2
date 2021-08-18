import genres from './genres.json';
import getFilms from './fetch-popular';
import appendGalleryMarkup from './drow-marckup';
import { showPopularFilm } from './popular';
import {paginationFilterPopularFilms} from './pagination';


const galleryContainer = document.querySelector('.film-card__list');
const filterNotification = document.querySelector('.filter__notification');

const genreFilter = document.getElementById("filter-popular");
genreFilter.addEventListener("change", onSearchFilmsByGenre);
function onSearchFilmsByGenre() {
    clearGallery();
    const genreInput = genreFilter.value;
    if (genreInput === "Any") {
        let queryParams = `trending/movie/week?api_key=27c4b211807350ab60580c41abf1bb8c`;
        showPopularFilm(queryParams);
        return;
    }
    const idGenre = genres.find(genre => genre.name === genreInput).id;
    localStorage.setItem('filterGenre', idGenre);
    let queryParams = `discover/movie?api_key=27c4b211807350ab60580c41abf1bb8c&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${idGenre}`;
    getFilms(queryParams)
        .then(films => {
            const movies = films.total_results;
            localStorage.setItem('movies', movies);
            appendGalleryMarkup(films.results);
        });
   setTimeout(() => {
       paginationFilterPopularFilms();
   }, 300);
    filterNotification.textContent = `Popular movies in the genre of ${genreInput}`
    filterNotification.classList.remove('is-hidden');
}

function clearGallery() {
  galleryContainer.innerHTML = ' ';
}