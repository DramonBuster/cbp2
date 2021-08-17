import getFilms from './fetch-popular'
 
const galleryContainer = document.querySelector('.film-card__list')
const modal = document.querySelector('.modal')
const backdrop = document.querySelector('.backdrop')


export default function buttonOnclick(filmResult) {

console.log(filmResult)

    galleryContainer.addEventListener('click', openModalMovie);
}

function showTexNoResulttButton(id) {

    for (let i = 0; i < galleryContainer.children.length; i++) {

          if (galleryContainer.children[i].dataset.id === id) {
       
              const currentBtnTrailer = galleryContainer.children[i].lastElementChild;
              currentBtnTrailer.classList.add('no-result')
    }
          }
}

function openModalMovie(evt) {
 
    const events = evt.target;
    console.log(evt.target.classList.contains('film-card__trailler'))
     const currentId = evt.target.dataset.movie;
  
      
    if (evt.target.classList.contains('film-card__trailler')) {
    
        let queryParams = `movie/${evt.target.dataset.movie}/videos?api_key=27c4b211807350ab60580c41abf1bb8c`;
  console.log(queryParams, `modal2`)
        fetchTraillerFilm(queryParams, currentId)
        return;
      }
   
}
function fetchTraillerFilm(queryParams, currentId) {
    getFilms(queryParams).then(film => {
       
        // modal.classList.add('parent')
        console.log(film, `мой массив`)
        const trailers = film.results;
          
        putTrailerInModal(trailers, currentId)
    
    } )

    
}
function putTrailerInModal(trailers, currentId) {
   
    if (trailers.length === 0) {
      
         showTexNoResulttButton(currentId)
        return
    }
 const trailerFilm = trailers.find(trailer => {

            if (trailer.name.includes('Official') && trailer.name.includes('Trailer')) {
               return trailer.key;
            } else if(trailer.name.includes('Trailer')) {
               return trailer.key;
            }
     if (trailers.length === 1) {
         return trailers[0];
     }
     
        
 })
  appendModalMarckup(trailerFilm)
}
function appendModalMarckup(trailerFilm) {

    console.log(trailerFilm, `трейлер`)
    modal.classList.remove('is-hidden');
    backdrop.classList.remove('is-hidden')
    const trailerKey = trailerFilm.key;
    
     modal.innerHTML = ` <div class="modal__trailer"><iframe class="modal__frame"  src="https://www.youtube.com/embed/${trailerKey}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`;
    //  closeModal() 
     window.addEventListener('click', closeModal)
}
function closeModal(evt) {

    // window.addEventListener('click', yfjfk)
      if (evt.target.classList.contains('modal')) {
            return;
      }
     if (evt.target.nodeName === 'IMG') {
    return;
  }
    if (evt.target.classList.contains('queue') || evt.target.classList.contains('watched')) {
        return
    }
    if (modal.classList.contains('is-hidden')) {
         modal.classList.add('is-hidden')
     backdrop.classList.add('is-hidden')
     modal.innerHTML = ''; 
    }
      modal.classList.add('is-hidden')
     backdrop.classList.add('is-hidden')
   modal.innerHTML = ''; 

   
    return;
  
}