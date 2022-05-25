const baseURL = 'https://www.apitutor.org/spotify/simple/v1/search';

// Note: AudioPlayer is defined in audio-player.js
const audioFile = 'https://p.scdn.co/mp3-preview/bfead324ff26bdd67bb793114f7ad3a7b328a48e?cid=9697a3a271d24deea38f8b7fbfa0e13c';
const audioPlayer = AudioPlayer('.player', audioFile);

const search = (ev) => {
    const term = document.querySelector('#search').value;
    console.log('search for:', term);
    // issue three Spotify queries at once...
    getTracks(term);
    getAlbums(term);
    getArtist(term);
    if (ev) {
        ev.preventDefault();
    }
}

const getTracks = (term) => {

    var data_resp;
    
    fetch(`https://www.apitutor.org/spotify/simple/v1/search?type=track&q=${term}`)
        .then(response => response.json())
        .then(data => helper1(data));

    var tracklist;
    var trackhtml = ``;
    function helper1(tracks){

        if (tracks.length > 5){
            tracklist = tracks.slice(0,5);
            tracklist.forEach(createtrackhtml);
            document.querySelector("#tracks").innerHTML = trackhtml;
        } 
        else if (tracks.length > 0) {
            tracklist = tracks;
            tracklist.forEach(createtrackhtml);
            document.querySelector("#tracks").innerHTML = trackhtml;
        }
        else{
            document.querySelector("#tracks").innerHTML = `No Tracks found with search ${term}`;
        }


        

    }

    function createtrackhtml(track){
        trackhtml +=
            `<button class="track-item preview" data-preview-track=${track['preview_url']} onclick="handleTrackClick(event);">
                <img alt = "image of the album ${track['album']['name']}" src=${track['album']['image_url']}>
                <i class="fas play-track fa-play" aria-hidden="true"></i>
                <div class="label">
                    <h2>${track['name']}</h2>
                    <p>
                        ${track['album']['name']}
                    </p>
                </div>
            </button>`;
    }
};



const getAlbums = (term) => {

    var data_resp;
    
    fetch(`https://www.apitutor.org/spotify/simple/v1/search?type=album&q=${term}`)
        .then(response => response.json())
        .then(data => helper2(data));

    albumshtml = ``;
    function helper2(albums){
        if (albums.length === 0){
            document.querySelector("#albums").innerHTML = `No Albums found associated with artist ${term}`;
        }
        else{
            albums.forEach(createalbumshtml);
            document.querySelector("#albums").innerHTML = albumshtml;
        }
    }

    function createalbumshtml(album){
        albumshtml +=
        `<section class="album-card" id=${album['id']}>
            <div>
                <img alt = "image of the album ${album['name']}" src=${album['image_url']}>
                <h2>${album['name']}</h2>
                <div class="footer">
                    <a href=${album['spotify_url']} target="_blank">
                        view on spotify
                    </a>
                </div>
            </div>
        </section>`
    }
};



const getArtist = (term) => {

    var data_resp;
    
    fetch(`https://www.apitutor.org/spotify/simple/v1/search?type=artist&q=${term}`)
        .then(response => response.json())
        .then(data => myFunc(data));


    var data_resp;
    var name = "";
    var image_url;
    var spotify_url;
    var id;

    function myFunc(success) {

        try{
            data_resp = success;
            id = data_resp[0]['id'];
            name = data_resp[0]['name'];
            image_url = data_resp[0]['image_url'];
            spotify_url = data_resp[0]['spotify_url'];



            document.querySelector("#artist").innerHTML = 
            `
            <section class="artist-card" id=${id}>
                <div>
                    <img alt = "image of ${name}" src=${image_url}>
                    <h2>${name}</h2>
                    <div class="footer">
                        <a href=${spotify_url} target="_blank">
                            view on spotify
                        </a>
                    </div>
                </div>
            </section>`;
            }
        

        catch{
            document.querySelector("#artist").innerHTML = `No artists found with name ${term}`
        }
    }
        
};



const handleTrackClick = (ev) => {
    const previewUrl = ev.currentTarget.getAttribute('data-preview-track');

    const img_url = ev.currentTarget.querySelector('img').getAttribute('src');
    const song_name = ev.currentTarget.querySelector('h2').innerHTML;
    const album_name = ev.currentTarget.querySelector('p').innerHTML.trim();

    console.log(img_url);
    console.log(song_name);
    console.log(album_name);

    document.querySelector("#current-track").innerHTML = 
    `<div id="current-track" class="track-item" data-preview-track=${previewUrl}>
        <img alt = "image of the album ${album_name}" src= ${img_url}>
        <i class="fas play-track fa-pause" aria-hidden="true"></i>
        <div class="label">
            <h2>${song_name}</h2>
            <p>
                ${album_name}
            </p>
        </div>
    </div>`
    ;
    audioPlayer.setAudioFile(previewUrl);
    audioPlayer.play();
}

document.querySelector('#search').onkeyup = (ev) => {
    // Number 13 is the "Enter" key on the keyboard
    console.log(ev.keyCode);
    if (ev.keyCode === 13) {
        ev.preventDefault();
        search();
    }
};