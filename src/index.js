import './css/styles.scss';
import photoCard from "./templates/cards.hbs";
import SearchApiServise from './fetch';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const searchApiService = new SearchApiServise();

const refs = {
  gallery: document.querySelector('.gallery'),
  searchForm: document.querySelector('.search-form'),
  loadMoreBtn: document.querySelector('[data-load="load-more"]')
};
// console.log(refs.loadMoreBtn);

 
refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();

   searchApiService.query = e.currentTarget.elements.search.value;
  // console.log(searchQuery);
  searchApiService.resetPage();
  searchApiService.fetchPixabay();
  
}

function onLoadMore(e) {
  searchApiService.fetchPixabay(); 
}