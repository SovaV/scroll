const API_KEY = '22963284-23f543f8627e95ac39317c785';
const BASE_URL = 'https://pixabay.com/api';
export default {
  searchQuery: '',

  page: 1,
  fetchContent() {
    const url = `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`;
    return fetch(url)
      .then(res => res.json())
      .then(({ hits }) => {
        this.incrementPage();
        return hits;
      })
      .catch(error => Promise.reject(error));
  },
  incrementPage() {
    this.page += 1;
  },

  resetPage() {
    this.page = 1;
  },

  get query() {
    return this.searchQuery;
  },

  set query(newQuery) {
    this.searchQuery = newQuery;
  },
};
