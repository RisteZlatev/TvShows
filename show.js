const id = new URLSearchParams(window.location.search).get("id");


async function getShowData(id) {
  const response = await fetch(`https://api.tvmaze.com/shows/${id}`);
  const show = await response.json();
  return show;
}


async function getEpisodesForShow(id) {
  const response = await fetch(`https://api.tvmaze.com/shows/${id}/episodes`);
  const episodes = await response.json();
  return episodes;
}


getEpisodesForShow(id).then((episodes) => {
  populateSeasonFilters(episodes);
  populateEpisodes(episodes);
});


getShowData(id).then((show) => {
  populateShow(show);
});


var selectedIndex = 0;


function populateSeasonFilters(episodes) {
  const numberOfSeasons = episodes[episodes.length - 1].season;
  console.log(numberOfSeasons);
  const seasonsArray = Array(numberOfSeasons)
    .fill()
    .map((_, index) => index + 1);


  const filterSeasonsContainer = document.getElementById("filter-seasons");


  seasonsArray.forEach((season, index) => {
    const seasonButton = document.createElement("div");
    seasonButton.classList.add("season-btn");
    seasonButton.innerHTML = `Season ${season}`;


    seasonButton.addEventListener("click", () => {
      const filteredEpisodes = episodes.filter(
        (episode) => episode.season == season
      );


      seasonButton.classList.add("selected");
      if (selectedIndex != index) {
        allSeasonButtons[selectedIndex].classList.remove("selected");
        selectedIndex = index;
      }


      populateEpisodes(filteredEpisodes);
    });


    filterSeasonsContainer.appendChild(seasonButton);
  });


  const allSeasonButtons = Array.from(
    document.getElementsByClassName("season-btn")
  );
  console.log(allSeasonButtons);
}


function populateShow(show) {
  const showContainer = document.getElementById("show");
  const showTitle = document.getElementById("show-title");
  showTitle.innerText = show.name;


  const showDivElement = document.createElement("div");
  showDivElement.classList.add("show");
  showDivElement.innerHTML = `
       <div class="show-left">
        <img src="${show.image.original}" width="350" />
       </div>
       <div class="show-right">
            <div id="genres">
            ${show.genres
              .map((genre) => `<span class="genre">${genre}</span>`)
              .join("")}
            </div>
            ${show.summary}
            <p>Premiered: ${show.premiered}</p>
            <p>Ended: ${show.ended}</p>


            <a href="cast.html?id=${show.id}&name=${show.name}">View Cast</a>
       </div>
    `;


  showContainer.appendChild(showDivElement);
  const genres = document.getElementById('genres');

  genres.addEventListener('click', (ev)=>{
    const genre = ev.target.closest('.genre')
    window.location.href = `genre.html?genre=${genre.innerText}`;
  })
}




function populateEpisodes(episodes) {
  const episodeContainer = document.getElementById("episodes");


  episodeContainer.innerHTML = "";
  episodeContainer.innerHTML += `<h1>Episodes: ${episodes.length}</h1>`;
  episodes.forEach((episode) => {
    const episodeDivElement = document.createElement("div");
    episodeDivElement.classList.add("episode");
    episodeDivElement.innerHTML = `
        <div class="episode-img">
            <img src="${episode.image.medium}" />
        </div>
        <div class="episode-data">
            <div class="episode-title-div">
                <h3>${episode.name}</h3>
                <span>${episode.airdate}</span>
            </div>
            ${episode.summary}
            <div class="episode-rate">
                <span><i class="fa fa-star" style="color: gold"></i> ${episode.rating.average}</span>
                <button><i class="fa fa-star" style="color: blue"></i> Rate</button>
            </div>
        </div>
      `;


    episodeDivElement.addEventListener("click", () => {
      console.log(episode.id);
    });


    episodeContainer.appendChild(episodeDivElement);
  });
}

const back = document.getElementById('back');
back.addEventListener('click', ()=>{
  window.location.href = "index.html";
})