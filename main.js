const search = document.getElementById('search')
const result = document.getElementById('result')

const apiURL = 'https://api.lyrics.ovh';



search.addEventListener('keypress',(event) => {
    if(event.keyCode == 13){
        searchSong(search.value);
        document.getElementById("title").style.display = "none";
    }
})


async function searchSong(searchValue){
    const searchResult = await fetch(`${apiURL}/suggest/${searchValue}`)
    const data = await searchResult.json();
    showData(data);
}

function showData(data){
  
    result.innerHTML = `
      ${data.data
        .map(song=> 
                    
              ` <div class="single-result row align-items-center my-3 p-3">
                    <div class="col-md-9">
                       <strong>${song.artist.name}</strong> -${song.title} 
                    </div>
                    <div class="col-md-3 text-md-right text-center">
                       <span data-artist="${song.artist.name}" data-songtitle="${song.title}" class=" btn btn-success"> get lyrics</span>
                    </div>
                </div>`
        )
        .join('')}
  `;
}


result.addEventListener('click', (event)=>{
    const clickedElement = event.target;

    
    if (clickedElement.tagName === 'SPAN'){
        const artist = clickedElement.getAttribute('data-artist');
        const songTitle = clickedElement.getAttribute('data-songtitle');
        
        getLyrics(artist, songTitle)
    }
})


async function getLyrics(artist, songTitle) {
    const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
    const data = await res.json();
  
    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');
  
    song.innerHTML = `<h2><strong>${artist}</strong> - ${songTitle}</h2>
    <p>${lyrics}</p>`;
  
  }