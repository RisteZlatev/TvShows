const id = new URLSearchParams(window.location.search).get("id");

async function getShowData(id) {
    const response = await fetch(`https://api.tvmaze.com/shows/${id}`);
    const data = await response.json();
    return data;
}

async function getEpisodes(id){
    const response = await fetch(`https://api.tvmaze.com/shows/${id}/episodes`);
    const episodes = await response.json();
    return episodes;
}

// getEpisodes(id).then(episodes => {
//     populateEpisodes(episodes);
// })

getShowData(id).then(data => {
    populateShow(data);
})

function populateShow(data){
    const showContainer = document.getElementById('show');
    const showTitle = document.getElementById('show-title');
    showTitle.innerText = data.name;

    const showDivElement = document.createElement("div");
  showDivElement.classList.add("show");
  showDivElement.innerHTML = `
       <div class="show-left">
        <img src="${data.image.original}" width="350" />
       </div>
       <div class="show-right">
            <div class="genres">
            ${data.genres
              .map((genre) => `<span class="genre">${genre}</span>`)
              .join("")}
            </div>
            ${data.summary}
            <p>Premiered: ${data.premiered}</p>
            <p>Ended: ${data.ended}</p>


            <a href="cast.html?id=${data.id}&name=${data.name}">View Cast</a>
       </div>
    `;


  showContainer.appendChild(showDivElement);

}