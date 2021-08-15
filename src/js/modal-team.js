const iconHeart = document.querySelector('.footer__icon');
const team__lightbox = document.querySelector('.team__lightbox');
const body = document.querySelector('body');
const btnClose = document.querySelector('.modal-close');

iconHeart.addEventListener('click', onTeamModalOpen);

function onTeamModalOpen() {
  team__lightbox.classList.remove('is-hidden');
  body.classList.add('modal-open');

  btnClose.addEventListener('click', onTeamModalClose);

  team__lightbox.addEventListener('click', evt => {
    if (evt.target.classList.contains('team__lightbox')) onTeamModalClose();
  });

  window.addEventListener('keydown', evt => {
    if (evt.code === 'Escape') onTeamModalClose();
  });
}

function onTeamModalClose() {
  team__lightbox.classList.add('is-hidden');
  body.classList.remove('modal-open');

  btnClose.removeEventListener('click', onTeamModalClose);
  team__lightbox.removeEventListener('click', onTeamModalClose);
}
