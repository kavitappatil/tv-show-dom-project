//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
  //console.log(allEpisodes);
  //allEpisodes.forEach((elem) => console.log(elem.summary));
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("episodeGrid");

  // Start for loop
  //for (i = 0; i < episodeList.length; i++) {
    
  episodeList.forEach((elem) => {
    let divEpisode = document.createElement("div");
    divEpisode.classList.add(["episode"]);

    //title
    let divTitle = document.createElement("div");
    divTitle.classList.add(["title"]);
    //span episode name and number
    let episodeName = document.createElement("span");
    episodeName.classList.add(["episodeName"]);

    let episodeNumber = document.createElement("span");
    episodeNumber.classList.add(["episodeNumber"]);

    episodeName.innerHTML = elem.name;
    episodeNumber.innerHTML = ` - S${elem.season}E${elem.number}`;

    divTitle.appendChild(episodeName);
    divTitle.appendChild(episodeNumber);

    divEpisode.appendChild(divTitle);

    //Image
    let episodeImg = document.createElement("img");
    episodeImg.src = elem.image.medium;
    episodeImg.classList.add(["episodeImg"]);

    divEpisode.appendChild(episodeImg);

    //paragraph
    let episodePara = document.createElement("p");
    episodePara.classList.add(["episodePara"]);
    episodePara.innerHTML = elem.summary;
    divEpisode.appendChild(episodePara);

    rootElem.appendChild(divEpisode);
  });

  //end for loop

  //rootElem.innerHTML = `Got ${episodeList.length} episode(s)`;
}

window.onload = setup;
