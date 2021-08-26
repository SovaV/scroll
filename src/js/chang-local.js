import { error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

import templCard from '../templates/card.hbs';
import searchQuery from './apiService.js';
import loadMoreBtn from './load-more-btn';

import InfiniteScroll from './if';

const galleryLet = document.querySelector('.gallery');
const searchFormLet = document.querySelector('#search-form');
const loadMoreBtnLet = document.querySelector('[data-action="load-more"]');

searchFormLet.addEventListener('submit', onSearch);
loadMoreBtnLet.addEventListener('click', onLoadMore);
galleryLet.addEventListener('click', openModal);

// ====== Modalka
import * as basicLightbox from 'basiclightbox';

function createModal(modalImg) {
  basicLightbox.create(`<img src="${modalImg}" >`).show();
}
function openModal(e) {
  const largeImageURL = e.target.dataset.source;
  if (e.target.nodeName === 'IMG') {
    console.log(e.target.nodeName);
    createModal(largeImageURL);
  }
}

function onSearch(e) {
  e.preventDefault();
  searchQuery.resetPage();
  searchQuery.query = e.currentTarget.query.value.trim();
  clearInput();
  if (searchQuery.query) {
    onLoadMore();
  } else {
    enterLetters();
  }
}

function onLoadMore() {
  loadMoreBtn.disable();
  searchQuery.fetchContent().then(cards => {
    renderingImgCard(cards);
  });
}

function renderingImgCard(hits) {
  if (hits.length !== 0) {
    galleryLet.insertAdjacentHTML('beforeend', templCard(hits));
    loadMoreBtn.show();
    loadMoreBtn.enable();
    scroll();
    if (hits.length < 12) {
      loadMoreBtn.hide();
    }
  } else {
    ERROR();
  }
}

function enterLetters() {
  loadMoreBtn.hide();
  error({
    text: '← Введи слово',
    delay: 1000,
  });
}
function ERROR() {
  loadMoreBtn.hide();
  error({
    text: '← Ошибка ввода',
    delay: 1000,
  });
}

function clearInput() {
  searchFormLet.query.value = '';
  galleryLet.innerHTML = '';
}
function scroll() {
  loadMoreBtnLet.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });
}
