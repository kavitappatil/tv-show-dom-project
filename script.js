
let rootElem = document.getElementById("episodeGrid");
let searchInput = document.getElementById("search");
let selectEpisodeSelector = document.getElementById("episodeSelector");
let allEpisodes = [];

//You can edit ALL of the code here
function setup() {
  allEpisodes = getAllEpisodes(); 
  showEpisodes(allEpisodes); //73

  //load episodeSelector dropdown
  populateEpisodeSelector(allEpisodes);

   // show valid search count
  validSearchCount = document.getElementById("validSearchCount");
  validSearchCount.innerHTML = `Displaying ${allEpisodes.length}/${allEpisodes.length} episodes`;

  //console.log(allEpisodes);
  //allEpisodes.forEach((elem) => console.log(elem.summary));
}

function showEpisodes(episodeList) {

  // Start for loop
  //for (i = 0; i < episodeList.length; i++) {
    //episodeList[i].name;
    
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
  //---------------------

  //rootElem.innerHTML = `Got ${episodeList.length} episode(s)`;
}

function populateEpisodeSelector(allEpisodes) {

  // Add options to selectEpisodeSelector
  //<option value="4952"><span>Winter is Coming</span><span> - S01E01</span></option>
    allEpisodes.forEach((elem) => {
      //create option element
    let optionElement = document.createElement("option");
      optionElement.setAttribute("value", elem.id);
      //create span element
    let episodeName = document.createElement("span");
      //create span element
    let episodeNumber = document.createElement("span");
     //assign values to elements
    episodeName.innerHTML = elem.name;
    episodeNumber.innerHTML = ` - S${elem.season}E${elem.number}`;
     
    optionElement.appendChild(episodeName);
    optionElement.appendChild(episodeNumber);
    //append to selectEpisodeSelector
    selectEpisodeSelector.appendChild(optionElement);
    
    
});
  
}

function clearEpisodes() {
  rootElem.innerHTML = "";
}

//function to search episodes
searchEpisodes = (e, allEpisodes) => {
  console.log(e.target.value);
  let foundEpisodes = [];

  //filter 
  foundEpisodes = allEpisodes.filter((episode) => {
   return (
    episode.name.includes(e.target.value) ||
    episode.name.toLowerCase().includes(e.target.value) ||
    episode.summary.includes(e.target.value) ||
    episode.summary.toLowerCase().includes(e.target.value) 
   )
  });

  // clear currently shown on screen
  clearEpisodes();

  //show found episodes
  console.log(foundEpisodes);
  showEpisodes(foundEpisodes); // 4 or 0;

  // show valid search count
  validSearchCount = document.getElementById("validSearchCount");
  validSearchCount.innerHTML = `Displaying ${foundEpisodes.length}/${allEpisodes.length} episodes`;
}

searchInput.addEventListener("input", (e) => {
  console.log(e.target.value);
  searchEpisodes(e, allEpisodes);
});

//search episodes using Select ID
function searchEpisodesUsingId(e, allEpisodes) {

  console.log(e.target.value);
  let foundEpisodes = [];

  //filter 
  if(e.target.value != 0)
  {
    foundEpisodes = allEpisodes.filter((episode) => {
    return (
        episode.id == e.target.value
      )
    });
  }
  else {
    foundEpisodes = allEpisodes;
  }

  // clear currently shown on screen
  clearEpisodes();

  //show found episodes
  console.log(foundEpisodes);
  showEpisodes(foundEpisodes); // 1

  // show valid search count
  validSearchCount = document.getElementById("validSearchCount");
  validSearchCount.innerHTML = `Displaying ${foundEpisodes.length}/${allEpisodes.length} episodes`;
  
}

selectEpisodeSelector.addEventListener("input", (e) => {
  console.log(e.target.value);
  searchEpisodesUsingId(e, allEpisodes);
});




window.onload = setup;  

