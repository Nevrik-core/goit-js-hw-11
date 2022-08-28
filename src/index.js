import './css/styles.scss';
import SearchApiServise from './js/fetch';
import { renderGallery } from './js/galleryRender';
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
let perPage = 40;
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

  searchApiService.fetchPixabay(page, perPage)
    .then(( data ) => {
      if (data.totalHits === 0) {
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
      } else {
        renderGallery(data.hits);
        simpleLightBox = new SimpleLightbox('.gallery a').refresh();
        Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
        if (data.totalHits > perPage) {
          setTimeout(() => { refs.loadMoreBtn.classList.remove('is-hidden'); }, 1000);
        }
      }
    })
    .catch(error => console.log(error));
}



function resetPage() {
  return page = 1;
}

function onLoadMore() {
  page += 1;
        simpleLightBox.destroy()
       
  searchApiService.fetchPixabay(page, perPage)
    .then((data) => {
      renderGallery(data.hits)
      simpleLightBox = new SimpleLightbox('.gallery a').refresh();
        
      const totalPages = Math.ceil(data.totalHits / perPage);
      if (page > totalPages) {
                
        refs.loadMoreBtn.classList.add('is-hidden');
            

        Notiflix.Notify.failure('We are sorry, but you have reached the end of search results.');
      }
    })
    .catch(error => console.log(error));
}


function clearGalleryContainer() {
  refs.gallery.innerHTML = '';
}
