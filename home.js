var audio = document.querySelector('#audio');
var band = document.querySelector('#band');
var search = document.querySelector('#search');
var song_bucket = document.querySelector('#song_bucket');

search.addEventListener('click', function(e){
  SC.get('/tracks', {q: band.value, limit: 16})
    .then(function(json){
      console.log(json);
      for(let i = 0; i < json.length; i++){
        let div = document.createElement("DIV");
        div.setAttribute('class', 'song_div');
        div.addEventListener('click', function(e){
          SC.oEmbed(json[i].uri, {
            element: document.getElementById('player'),
            auto_play: true
          });
        })
        song_bucket.appendChild(div);

        let albumCover = document.createElement("IMG");
        albumCover.setAttribute("class", "song_art");
        albumCover.setAttribute("src", json[i].artwork_url);
        div.appendChild(albumCover);

        let song = document.createElement("P");
        song.textContent = json[i].title;
        song.setAttribute("class", "song_title");
        div.appendChild(song);

        let band_name = document.createElement("P");
        band_name.textContent = json[i].user.username;
        band_name.setAttribute("class", "song_artist");
        div.appendChild(band_name);
      }})
  });

// SC.oEmbed('http://api.soundcloud.com/tracks/291270561', {
//     element: document.getElementById('player'),
//     auto_play: true
//   });
