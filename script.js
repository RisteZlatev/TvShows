async function getShows(searchKeyword) {
  if (searchKeyword == "" || searchKeyword == undefined) {
    const response = await fetch("https://api.tvmaze.com/shows");
    const data = await response.json();
    return data;
  } else {
    const response = await fetch(
      `https://api.tvmaze.com/search/shows?q=${searchKeyword}`
    );
    const data = await response.json();
    const mappedShows = data.map((x) => x.show);
    return mappedShows;
  }
}


const showsContainer = document.getElementById("shows");


function renderGenres(genres) {
  var genresHtml = "";
  genres.forEach((genre) => {
    genresHtml += `<span class="genre">${genre}</span>`;
  });
  return genresHtml;
}


// Alternative way of rendering the genres using forEach
// ${renderGenres(show.genres)}


// Initial load
getShows().then((shows) => {
  populateShows(shows);
});


const userName = localStorage.getItem('name');
const header = document.getElementById('head');
const greeting = document.createElement('h2');
greeting.innerHTML = `Hello ${userName}, here are the top 250 shows of all time!`;
header.appendChild(greeting)


function populateShows(shows) {
  showsContainer.innerHTML = "";
  var noResultsContainer = document.getElementById("no-results");


  if (shows.length == 0) {
    noResultsContainer.innerHTML = `
        <img src="./images/no-results.png" />
        <h2>No Results</h2>
        <p>Please change your search keyword</p>
    `;
  } else {
    noResultsContainer.innerHTML = "";
    
    shows.forEach((show) => {
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
          
    });
  }
}


const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");


// searchBtn.addEventListener("click", () => {
//   getShows(searchInput.value).then((shows) => {
//     console.log("shows before rendering: ", shows);
//     populateShows(shows);
//   });
// });


// searchInput.addEventListener("keydown", () => {
//   getShows(searchInput.value).then((shows) => {
//     console.log("shows before rendering: ", shows);
//     populateShows(shows);
//   });
// });


// Function that waits a certain amount of time to call another function
const debounce = (func, wait) => {
  var timeout;


  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };


    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};


function getData() {
  console.log("get data called");
  getShows(searchInput.value).then((shows) => {
    console.log("shows before rendering: ", shows);
    populateShows(shows);
  });
}


searchInput.addEventListener("keydown", debounce(getData, 500));


// Mapping the array -> show.genres.map((genre) => `<span class="genre">${genre}</span>`)


// From:
// [Drama,Science-Fiction,Thriller]


// To:
// <span>Drama</span>
// <span>Science-Fiction</span>
// <span>Thriller</span>


//Description and episodes when clicking on a show:

// const desc = document.getElementById('description');

// showsContainer.addEventListener('click', (ev)=>{
//     const showElement = ev.target.closest('.show');
    
//     desc.innerHTML = "";
//     if(showElement){
//       const showId = showElement.id;
//       const showName = showElement.querySelector('#showName')
//       desc.style.display = 'block';
//       desc.innerHTML = `
//           <h1>${showName.innerText}</h1>
//       `
//       getEpisodes(showId).then((episodes) => {
//         populateEpisodes(episodes);
//       })

//     }
// } );

// async function getEpisodes(id){
//     const response = await fetch(`https://api.tvmaze.com/shows/${id}/episodes`);
//     const episodes = await response.json();
//     return episodes;
// }

// function populateEpisodes(episodes,showName){
//   episodes.forEach(episode =>{
//       desc.innerHTML += `
//           <div class="episode">
//             <h2>S${episode.season}.E${episode.number} &#x2022; ${episode.name}</h2>
//             <p>${episode.summary}</p>
//           </div>
//       `
//   })
// }
const logOut = document.getElementById('logOutBtn');
logOut.addEventListener('click', ()=>{
  window.location.href = 'login.html';
})

showsContainer.addEventListener('click', (ev)=>{
  const showElement = ev.target.closest('.show');
  window.location.href = `show.html?id=${showElement.id}`
});