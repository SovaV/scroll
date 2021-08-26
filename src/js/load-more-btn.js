const loadMoreBtnRef = document.querySelector('[data-action="load-more"]');
const loadMoreBtnLabelRef = document.querySelector('.label');

const loadMoreBtn = {
  enable() {
    loadMoreBtnRef.disabled = false;
    loadMoreBtnLabelRef.textContent = 'Загрузи больше';
  },

  disable() {
    loadMoreBtnRef.disabled = true;
    loadMoreBtnLabelRef.textContent = 'Загруз...';
  },

  show() {
    loadMoreBtnRef.classList.remove('is-hidden');
  },

  hide() {
    loadMoreBtnRef.classList.add('is-hidden');
  },
};

export default loadMoreBtn;
