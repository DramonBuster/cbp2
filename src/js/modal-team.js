const btnHeart = document.querySelector('.footer__icon');
const lightBox = document.querySelector('.team__lightbox');

btnHeart.addEventListener('click', onTeamModalOpen);

function onTeamModalOpen() {
  lightBox.classList.remove('is-hidden');
}
