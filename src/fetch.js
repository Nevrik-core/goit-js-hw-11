

export default class SearchApiServise {

    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }
    
    fetchPixabay() {
    console.log(this);
    const base = "https://pixabay.com/api/";
    const imageType = 'photo';
    const orientation = 'horizontal';
    const safesearch = true;
    const key = '29444128-664601f5e312d32a4879ca112';


    const url = `${base}?key=${key}&q=${this.searchQuery}&$image_type=${imageType}&orientation=${orientation}&safesearch=${safesearch}&page=${this.page}&per_page=40`)
            fetch(url)
                .then(response => response.json()
                    .then(data => {
                        this.page += 1;
                    }));
   
    }

    resetPage() {
        this.page = 1;
    }
    
    get query() {
        return this.searchQuery;
    }
    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}
    
    

