const getEpisode1 = () => {
    const p = fetch("https://api.tvmaze.com/episodes/1913280"),
    {
        method: 'POST',
        headers: {
          'Accept': 'application/json'
        },
        body:
    );
    console.log(p);
    p.then(response => response.json
        .then(data => showEpisodes(data)))
        .catch(error => console.log("Error: " + error));
    console.log(p);  
}

const mainDiv = document.getElementById("main");

const showEpisodes1 = (episode) => {
  mainDiv.innerText = JSON.stringify(episode);
  try {
    const a = 6/0;
    console.log("A = " + a);
    "hi".toUpperCase(); 
  } catch(e) {
    console.log(e);
    //sendDevUrgentEmail(e);getting two errors
    throw new Error("Something went wrong!");
  }
  console.log("hi".toUpperCase);
}

getEpisode1();