import appendGalleryMarkup from './drow-marckup';
import { onMadeWatchedGallery } from './modal';
import { onMadeQueueGallery } from './modal';
import { paginationFilterQueueFilms } from './pagination';
import { paginationFilterWatchedFilms } from './pagination';
import tplFilterQueue from '../templates/filter-library-queue.hbs';

const galleryContainer = document.querySelector('.film-card__list');
const noResultDiv = document.querySelector('.no-result');
const paginationDiv = document.querySelector('.tui-pagination');

export function filterQueue () {
    const filter = document.querySelector('.filter');
    //очищаем div фильтра
    filter.innerHTML = ' ';
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
    console.log(filterNotification);
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
        console.log("empty");
        //genreFilterLibraryQueue.classList.add('is-hidden');
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

export function filterWatched() {
    const filter = document.querySelector('.filter');
    //очищаем div фильтра
    filter.innerHTML = ' ';
    //рисуем новый фильтр
    const filterForLibraryQueue = tplFilterQueue();
    filter.insertAdjacentHTML('beforeend', filterForLibraryQueue);
    const genreFilterLibraryQueue = document.getElementById("filter-library-queue");
   // console.log("filter", genreFilterLibraryQueue)
    //вешаем слушатель на фильтр
    genreFilterLibraryQueue.addEventListener("change", onSearchByGenreQueueFilms);
}
//слушатель фильтра просмотренных фильмов
// genreFilterLibraryWatched.addEventListener("change", onSearchFilmsByGenreWatchedFilms);
function onSearchFilmsByGenreWatchedFilms() {
    clearGallery();
    const genreFilterLibraryWatched = document.getElementById("filter-library-watched");
    const genreInput = genreFilterLibraryWatched.value;
    let arrayForDraw = [];
    const watchedFilms = JSON.parse(localStorage.watched);
    if (genreInput === "Any") {
        onMadeWatchedGallery();
        return;
    }
    
    for (const film of watchedFilms) {
        if (film.genres.includes(genreInput)) {
            arrayForDraw.push(film);
        }
    }
    console.log(arrayForDraw);
    if (arrayForDraw.length === 0) {
        console.log("empty");
        // genreFilterLibraryQueue.classList.add('is-hidden');
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

function clearGallery() {
  galleryContainer.innerHTML = ' ';
}