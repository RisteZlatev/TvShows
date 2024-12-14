const id = new URLSearchParams(window.location.search).get("id");
const showName = new URLSearchParams(window.location.search).get("name");


console.log(window.location.href);


document.getElementById("show-title").innerHTML += ` ${showName}`;
const backLink = document.getElementById("back")


backLink.innerHTML += ` ${showName}`;
backLink.href = `show.html?id=${id}`;


async function getCastForShow() {
  const response = await fetch(`https://api.tvmaze.com/shows/${id}/cast`);
  const cast = await response.json();
  return cast;
}


getCastForShow().then((cast) => {
  populateCast(cast);
});


function populateCast(cast) {
  const castContainerDiv = document.getElementById("cast-container");
  cast.forEach((cast) => {
    const castDiv = document.createElement("div");
    castDiv.classList.add("cast-item");


    castDiv.innerHTML = `
    <div class="person">
        <h3>${cast.person.name}</h3>
        <img src="${cast.person.image.medium}" alt=""> 
    </div>
    <div class="character">
        <h3>${cast.character.name}</h3>
        <img src="${cast.character.image.medium}" alt=""> 
    </div>
    `;
    castContainerDiv.appendChild(castDiv);
  });
}
