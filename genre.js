const genre = new URLSearchParams(window.location.search).get("genre");
const showsContainer = document.getElementById('show-container');
const header = document.getElementById('header');

async function getShows() {
    const response = await fetch("https://api.tvmaze.com/shows");
    const shows = await response.json();
    return shows;
}


 


function populateShows(shows, genre){

    header.innerHTML = `Here are the top ${genre} shows:`


    shows.forEach((show) => {
        if(show.genres.includes(genre)){
        showsContainer.innerHTML += `
        <div class="show" id="${show.id}">
          <i class="fa-solid fa-bookmark bookmark"></i>
          <img class="show-img" src="${show.image.medium}" />
          <div class="show-data">
          <h2 id="showName">${show.name}</h2>
          <p><i class="fa-solid fa-star"></i> ${show.rating.average}</p>
          <div class="genres">
          ${show.genres
            .map((genre) => `<span class="genre">${genre}</span>`)
            .join("")}
            </div>
            <div class="links">
            <a href="https://www.imdb.com/title/${
              show.externals.imdb
            }" target="_blank">Learn More</a></div></div>
        </div>
            `;
            
        }
});
    
}

getShows().then((shows)=>
    populateShows(shows,genre));

showsContainer.addEventListener('click', (ev)=>{
    const showElement = ev.target.closest('.show');
    window.location.href = `show.html?id=${showElement.id}`
  });

  const back = document.getElementById('back');
  back.addEventListener('click', ()=>{
    window.location.href = "index.html";
  })