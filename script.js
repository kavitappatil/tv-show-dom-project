
let rootElem = document.getElementById("episodeGrid");
let searchInput = document.getElementById("search");
let selectEpisodeSelector = document.getElementById("episodeSelector");
let selectShowSelector = document.getElementById("showSelector");
let allEpisodes = [];
let allShows = [];


//You can edit ALL of the code here
function setup() {
   allShows = getAllShows();
   console.log(allShows);
    populateShowSelector(allShows); 

  // populate episodes
  fetch("https://api.tvmaze.com/shows/82/episodes")
    .then((response) => response.json())
    .then(data => { 
      console.log(data); 
      
      allEpisodes = data;
      console.log(allEpisodes); 
      showEpisodes(allEpisodes); //73

      //load episodeSelector dropdown
      populateEpisodeSelector(allEpisodes);

      // show valid search count
      validSearchCount = document.getElementById("validSearchCount");
      validSearchCount.innerHTML = `Displaying ${allEpisodes.length}/${allEpisodes.length} episodes`;

    })
    .catch(err => console.log(err));

  

  //console.log(allEpisodes);
  //allEpisodes.forEach((elem) => console.log(elem.summary));
}
//

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


function populateShowSelector(allShows) {

  
    allShows.forEach((elem) => {
    let optionElement = document.createElement("option");
    optionElement.setAttribute("value", elem.id);
    //create span element
    let episodeName = document.createElement("span");
    //assign values to elements
    episodeName.innerHTML = elem.name;
     
    optionElement.appendChild(episodeName);
    //append to selectEpisodeSelector
    selectShowSelector.appendChild(optionElement);
});
}
function clearShows() {
  rootElem.innerHTML = "";
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

//======= Declaring a function just to clear the page from all episodes-======
  function removeAllChildNodes(parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
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
// ============Show search ==========================
//search show using Select ID
function searchShowsUsingId(e, allShows) {

  console.log(e.target.value);
  let foundShows = [];
  //filter 
  if(e.target.value != 0)
  {a
    foundShows = allShows.filter((show) => {
    return (
        show.id == e.target.value
      )
    });
  }
  else {
    foundShows = allShows;
  }

  // clear currently shown on screen
  clearShows();

  //show found episodes
  console.log(foundShows);
  showEpisodes(foundShows); // 1

  // show valid search count
  validSearchCount = document.getElementById("validSearchCount");
  validSearchCount.innerHTML = `Displaying ${foundEpisodes.length}/${allEpisodes.length} shows`;
  
}
//============================

selectEpisodeSelector.addEventListener("input", (e) => {
  console.log(e.target.value);
  searchEpisodesUsingId(e, allEpisodes);
});

selectShowSelector.addEventListener("input", (e) => {

  removeAllChildNodes(rootElem);
  removeAllChildNodes(selectEpisodeSelector);
  //select episode text
  let optionElement = document.createElement("option");
      optionElement.setAttribute("value", 0);
      optionElement.innerText="Select Episode";
      selectEpisodeSelector.appendChild(optionElement);
      

  console.log(e.target.value);
  let showEpisodesUrl = `https://api.tvmaze.com/shows/${e.target.value}/episodes`
  console.log(showEpisodesUrl);
  //searchShowsUsingId(e, allShows);
  fetch(showEpisodesUrl)
    .then((response) => response.json())
    .then(data => { 
      console.log(data); 
      
      allEpisodes = data;
      console.log(allEpisodes); 
      showEpisodes(allEpisodes); //73

      //load episodeSelector dropdown
      populateEpisodeSelector(allEpisodes);

      // show valid search count
      validSearchCount = document.getElementById("validSearchCount");
      validSearchCount.innerHTML = `Displaying ${allEpisodes.length}/${allEpisodes.length} episodes`;

    })
    .catch(err => console.log(err));

  });



window.onload = setup;  

