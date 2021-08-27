import { error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

import templCard from '../templates/card.hbs';
import searchQuery from './apiService.js';

const galleryLet = document.querySelector('.gallery');
const searchFormLet = document.querySelector('#search-form');
const setContainer = document.querySelector('.container');

searchFormLet.addEventListener('submit', onSearch);
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
  searchQuery.fetchContent().then(cards => {
    renderingImgCard(cards);
  });
}

function renderingImgCard(hits) {
  if (hits.length !== 0) {
    galleryLet.insertAdjacentHTML('beforeend', templCard(hits));
  } else {
    ERROR();
  }
}

function enterLetters() {
  error({
    text: '← Введи слово',
    delay: 1000,
  });
}
function ERROR() {
  error({
    text: '← Больше нет результатов',
    delay: 1000,
  });
}

function clearInput() {
  searchFormLet.query.value = '';
  galleryLet.innerHTML = '';
}

// ===== бескінечний скролл
function onEntry(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting && searchQuery.query) {
      onLoadMore();
    }
  });
}

const options = {};

const observer = new IntersectionObserver(onEntry, options);
observer.observe(setContainer);
