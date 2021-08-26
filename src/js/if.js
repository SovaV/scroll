import InfiniteScroll from 'infinite-scroll';
console.log(InfiniteScroll);

const API_KEY = '22963284-23f543f8627e95ac39317c785';
const BASE_URL = 'https://pixabay.com/api';

const infScroll = new InfiniteScroll('.container', {
  path() {
    const url = `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`;
    return url;
  },
});
