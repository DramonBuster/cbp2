import appendGalleryMarkup from './drow-marckup';
import genres from './genres.json';
import getFilms from './fetch-popular';
import { showPopularFilm } from './popular';
import { clearGallery } from './fetch-query';
import tplFilterPopular from '../templates/filter-popular.hbs';
import tplFilterQueue from '../templates/filter-library-queue.hbs';
import tplFilterWatched from '../templates/filter-library-watched.hbs';
import { onMadeWatchedGallery } from './modal';
import { onMadeQueueGallery } from './modal';
import { paginationFilterQueueFilms, paginationFilterWatchedFilms,paginationFilterPopularFilms } from './pagination';

const noResultDiv = document.querySelector('.no-result');
const paginationDiv = document.querySelector('.tui-pagination');

//создаем фильтр популярных фильмов
export function filterPopular() {
    clearFilter()
    const filter = document.querySelector('.filter');
    //рисуем новый фильтр
    const filterForPopular = tplFilterPopular();
    filter.insertAdjacentHTML('beforeend', filterForPopular);
    const genreFilterPopular = document.getElementById("filter-popular");
    //вешаем слушатель на фильтр
    genreFilterPopular.addEventListener("change", onSearchByGenrePopularFilms);
}

//поиск популярных фильмов по жанру
function onSearchByGenrePopularFilms() {
    const genreFilterPopular = document.getElementById("filter-popular");
    const filterNotification = document.querySelector('.filter__notification');
    clearGallery();
    const genreInput = genreFilterPopular.value;
    if (genreInput === "Any") {
        filterNotification.classList.add('is-hidden');
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

//создаем фильтр фильмов в очереди
export function filterQueue() {
    clearFilter()
    const filter = document.querySelector('.filter');
    //рисуем новый фильтр
    const filterForLibraryQueue = tplFilterQueue();
    filter.insertAdjacentHTML('beforeend', filterForLibraryQueue);
    const genreFilterLibraryQueue = document.getElementById("filter-library-queue");
   // console.log("filter", genreFilterLibraryQueue)
    //вешаем слушатель на фильтр
    genreFilterLibraryQueue.addEventListener("change", onSearchByGenreQueueFilms);
}

//поиск фильмов в очереди по жанру
function onSearchByGenreQueueFilms() {
    const genreFilterLibraryQueue = document.getElementById("filter-library-queue");
    const filterNotification = document.querySelector('.filter__notification');
    clearGallery();
    //получаем значение выбора в фильтре
    const genreInput = genreFilterLibraryQueue.value;
    if (genreInput === "Any") {
        onMadeQueueGallery();
        return;
    }
    //создаем новый массив фильмов, которые содержат нужный жанр
    let arrayForDraw = [];
    const queueFilms = JSON.parse(localStorage.queue);
    for (const film of queueFilms) {
        if (film.genres.includes(genreInput)) {
            arrayForDraw.push(film);
        }
    }
    //если фильмы по жанру не найдены
    if (arrayForDraw.length === 0) {
        //filterMessage.classList.add('is-hidden');
        filterNotification.textContent = `No movies in the genre of ${genreInput}`
        filterNotification.classList.remove('is-hidden');
        noResultDiv.classList.remove('is-hidden');
        paginationDiv.classList.add('is-hidden');
        return;
    } else {
        appendGalleryMarkup(arrayForDraw.slice(0, 20));
    }
    
    setTimeout(() => {
       paginationFilterQueueFilms(arrayForDraw);
    }, 300);
    
    filterNotification.textContent = `Movies in the genre of ${genreInput}`
    filterNotification.classList.remove('is-hidden');
    
}

//создаем фильтр просмотренных фильмов
export function filterWatched() {
    clearFilter()
    const filter = document.querySelector('.filter');
    //рисуем новый фильтр
    const filterForLibraryWatched = tplFilterWatched();
    filter.insertAdjacentHTML('beforeend', filterForLibraryWatched);
    const genreFilterLibraryWatched = document.getElementById("filter-library-watched");
   // console.log("filter", genreFilterLibraryQueue)
    //вешаем слушатель на фильтр
    genreFilterLibraryWatched.addEventListener("change", onSearchByGenreWatchedFilms);
}

//поиск просмотренных фильмов по жанру
function onSearchByGenreWatchedFilms() {
    const genreFilterLibraryWatched = document.getElementById("filter-library-watched");
    const filterNotification = document.querySelector('.filter__notification');
    clearGallery();
    //получаем значение выбора в фильтре
    const genreInput = genreFilterLibraryWatched.value;
    if (genreInput === "Any") {
        onMadeWatchedGallery();
        return;
    }
    //создаем новый массив фильмов, которые содержат нужный жанр
    let arrayForDraw = [];
    const watchedFilms = JSON.parse(localStorage.watched);
    for (const film of watchedFilms) {
        if (film.genres.includes(genreInput)) {
            arrayForDraw.push(film);
        }
    }
    //если фильмы по жанру не найдены
    if (arrayForDraw.length === 0) {
        // filterMessage.classList.add('is-hidden');
        filterNotification.textContent = `No movies in the genre of ${genreInput}`
        filterNotification.classList.remove('is-hidden');
        noResultDiv.classList.remove('is-hidden');
        paginationDiv.classList.add('is-hidden');
        return;
    } else {
        appendGalleryMarkup(arrayForDraw.slice(0, 20));
    }
    
    setTimeout(() => {
       paginationFilterWatchedFilms(arrayForDraw);
    }, 300);
    
    filterNotification.textContent = `Movies in the genre of ${genreInput}`
    filterNotification.classList.remove('is-hidden');
}

export function clearFilter() {
    const filter = document.querySelector('.filter');
    filter.innerHTML = ' ';
}