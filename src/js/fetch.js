
// import Notiflix from 'notiflix';
export default class SearchApiServise {

    constructor() {
        this.searchQuery = '';
    }
    
    async fetchPixabay(page, perPage) {
        // console.log(this);
        
    const base = "https://pixabay.com/api/",
          imageType = 'photo',
          orientation = 'horizontal',
          safesearch = true,
          key = '29444128-664601f5e312d32a4879ca112';


        const url = `${base}?key=${key}&q=${this.searchQuery}&$image_type=${imageType}&orientation=${orientation}&safesearch=${safesearch}&page=${page}&per_page=${perPage}`;
        
        const response = await fetch(url);
        const fetchImg = await response.json();

        return fetchImg;
    }
    
    get query() {
        return this.searchQuery;
    }
    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}
    
    

