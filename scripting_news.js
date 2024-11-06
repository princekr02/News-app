const API_KEY = "ed1b68af04f147b4aee8f906d2b6e051";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load",()=> fetchNews("India"));

//onclick logo tab reload the page
function reload(){
    window.location.reload();
}

async function fetchNews(query){
    // format same as news api {url,query & api}
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    //conveting to json format
    const data = await res.json();
    bindData(data.articles);
}

function bindData(articles){
    const cardsContainer = document.getElementById('cards-container');
    const newsCardTemplate = document.getElementById('template_news_card');

    cardsContainer.innerHTML = '';

    articles.forEach(article => {
        //in some of the cases image is not shown 
        //so we will not dislplay that news 
        if(!article.urlToImage)return;
        //deep cloning , so that all div inside the main div should clone
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone,article);
        cardsContainer.appendChild(cardClone);
    })

}

function fillDataInCard(cardClone,article){
    const newsImg = cardClone.querySelector('#news_img');
    const newsTitle = cardClone.querySelector('#news_title');
    const newsSource = cardClone.querySelector('#news_source');
    const newsDesc = cardClone.querySelector('#news_desc');

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleDateString("en-US",{
        timeZone:"Asia/Jakarta"
    });

    newsSource.innerHTML = `${article.source.name} . ${date}`;

    //go to the url to original news
    cardClone.firstElementChild.addEventListener("click",()=>{
        //_blank : to open in new tab
        window.open(article.url,"_blank");
    })
}

let curSelectedNav = null;
//search query and 
function onNavItemClick(id){
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = navItem;
    curSelectedNav.classList.add('active');
}

//search button
const searchButton = document.getElementById('search_button');
const searchText = document.getElementById('search_text');

searchButton.addEventListener('click',()=>{
    const query = searchText.value;
    //if no text is entered and search button is clicked
    if(!query)return;
    fetchNews(query);
    //if something is searched then removed the active class of nav tab
    curSelectedNav?.classList.remove('active');
    currSelectedNav = null;

})