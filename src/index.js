import './css/styles.scss';
import photoCard from "./templates/cards.hbs";
import SearchApiServise from './fetch';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


const searchApiService = new SearchApiServise();

const refs = {
  gallery: document.querySelector('.gallery'),
  searchForm: document.querySelector('.search-form'),
  loadMoreBtn: document.querySelector('[data-load="load-more"]')
};
// console.log(refs.loadMoreBtn);

let page = 1;
let simpleLightBox;
 
refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();
  refs.loadMoreBtn.classList.add('is-hidden');
  clearGalleryContainer();
  searchApiService.query = e.currentTarget.elements.search.value.trim();
  resetPage();


  if (searchApiService.query === '') {
    Notiflix.Notify.failure('The search string cannot be empty. Please specify your search query.');
    return;
  }

  
  const findImages = searchApiService.fetchPixabay(page, 40)
    .then(data => {
      Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
      page += 1;
      return data.hits;
    });
  const renderToMarkup = findImages.then(appendPhotosMarkup);
  simpleLightBox = new SimpleLightbox('.gallery a', {
    
    captionsData: 'alt',
    captions: true,
    captionType: 'attr',
    captionDelay: 250
    
}).refresh();


  setTimeout(() => { refs.loadMoreBtn.classList.remove('is-hidden'); }, 1000);
  
}

function resetPage() {
  return page = 1;
}

function onLoadMore(e) {
  // console.log(searchApiService.fetchPixabay().then(data => data));
  searchApiService.fetchPixabay().then(images => {
    // console.log(images);
    appendPhotosMarkup(images);
  }); 

}

function appendPhotosMarkup(hits) {
  refs.gallery.insertAdjacentHTML('beforeend', photoCard(hits));
}

function clearGalleryContainer() {
  refs.gallery.innerHTML = '';
}
