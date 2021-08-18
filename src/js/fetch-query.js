import getFilms from './fetch-popular';
import appendGalleryMarkup from './drow-marckup';
import { paginationSearchFilms } from './pagination';
import {clearFilter } from './filter';

const form = document.querySelector('.form');
// const input = document.querySelector('.form__input');
const galleryContainer = document.querySelector('.film-card__list');
const notification = document.querySelector('.notification');
const paginationDiv = document.querySelector('.tui-pagination');
const noResultDiv = document.querySelector('.no-result');

form.addEventListener('submit', serchFilms);

function serchFilms(e) {
  // cursor spiner
  document.body.style.cursor = 'wait';
  //
  e.preventDefault();
  clearGallery();
  clearFilter()
  //cкрываем нотификацию
  showNotification()
  const currentTarget = e.target.elements.searchQuery.value.trim();
  localStorage.setItem('input', currentTarget);
  let queryParams = `search/movie?api_key=27c4b211807350ab60580c41abf1bb8c&language=en-US&page=1&include_adult=false&query=${currentTarget}`;
  console.log(queryParams);
  getFilms(queryParams)
    .then(films => {
      if (films.results.length === 0) {
        notification.classList.remove('is-hidden');
        noResultDiv.classList.remove('is-hidden');
        paginationDiv.classList.add('is-hidden');
    
        // setTimeout(showNotification, 6000);
        return;
      }
      noResultDiv.classList.add('is-hidden');
      paginationDiv.classList.remove('is-hidden');
      const movies = films.total_results;
      localStorage.setItem('movies', movies);
      const queryCards = films.results;
      createGallery(queryCards);

      // console.log(films.results, `gfdhg`);
    })
    .catch(error => {
      paginationDiv.classList.add('is-hidden');
      noResultDiv.classList.remove('is-hidden');
      console.log(error);
    });
  // end cursor spinner
  setTimeout(() => {
    document.body.style.cursor = 'default';
  }, 100);
  //
  //запускаем пагинацию фильмов по названию
  setTimeout(() => {
    paginationSearchFilms();
  }, 300);
  form.reset();
}

export function clearGallery() {
  galleryContainer.innerHTML = ' ';
}

function createGallery(queryCards) {
  appendGalleryMarkup(queryCards);
}

function showNotification() {
  console.log('Показываю предупреждение');
  notification.classList.add('is-hidden');
  // paginationDiv.classList.remove('is-hidden');
}
