session_id = sessionStorage.getItem("session_id");
var modal = document.getElementById('myModal');
var modalbtn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

$(document).on("click", "#modalClose", function(){
        modal.style.display = "none";

});


$(document).on("click", "#loginButton", function login(){
    axios.get('https://api.themoviedb.org/3/authentication/token/new?api_key=104e32522366bab70824b79d525c5c45')﻿
    .then((response) => {
      console.log(response);
       
        console.log(response.data.request_token);
        
         window.location = "https://www.themoviedb.org/authenticate/"+ response.data.request_token +"?redirect_to=http://localhost/hp/index.html";
     }); 
});

$(document).ready(() => { 
    searchForm();
    getSessionId();
    getAccountInfo(session_id);
    getHome();
    
});

function searchForm(){
    
    $('#searchForm').on('submit', (e) => {
    let searchText = $('#searchText').val();
    getMovies(searchText);
    e.preventDefault();
    document.getElementById("heading").innerHTML = "Search Results";
  });
}

function getSessionId() {
    
    axios.get('https://api.themoviedb.org/3/authentication/session/new?request_token='+getQueryVariable("request_token")+'&api_key=104e32522366bab70824b79d525c5c45')﻿
    .then((response) => {
        console.log(response);
  
        sessionStorage.setItem('session_id', response.data.session_id);

     });     
}

function getAccountInfo(session_id) {
    
 axios.get('https://api.themoviedb.org/3/account?api_key=104e32522366bab70824b79d525c5c45&session_id=' + session_id)﻿
    .then((response) => {
    console.log(response);
     username = response.data.username;
     user_id = String(response.data.id);
     sessionStorage.setItem('user_id', user_id);  
     sessionStorage.setItem('username', username);  
     document.getElementById("loginButton").innerHTML = sessionStorage.getItem("username");
     });  
}

function getQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
            var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}


function getHome(){
     document.getElementById("shareLink").innerHTML = "";
    document.getElementById("shareLink").style.padding = "0";
    document.getElementById("heading").innerHTML = "Upcoming Movies";
    axios.get('https://api.themoviedb.org/3/discover/movie?api_key=104e32522366bab70824b79d525c5c45&language=en-US&primary_release_date.gte=2018-04-20&primary_release_date.lte=2018-12-31')﻿
        .then((response) => {
          console.log(response);
          let movies = response.data.results;
          let output = '';
          $.each(movies, (index, movie) => {
            output += `
              <div id="movieResult"  class="col-md-3" onclick="movieSelected('${movie.id}')">
                <div class="well text-center">
                  <img src="${'http://image.tmdb.org/t/p/w500/'+movie.poster_path}">
                  <h5>${movie.title}</h5>
                </div>
              </div>
            `;
      });

      $('#movies').html(output);
    })
    .catch((err) => {
      console.log(err);
    });
}


$(document).on("click", "#popularMovies", function getPopular(){
     document.getElementById("shareLink").innerHTML = "";
        document.getElementById("shareLink").style.padding = "0";

    document.getElementById("heading").innerHTML = "Most Popular Movies";
    axios.get('https://api.themoviedb.org/3/discover/movie?api_key=104e32522366bab70824b79d525c5c45&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=1')﻿
    .then((response) => {
      console.log(response);
      let movies = response.data.results;
      let output = '';
      $.each(movies, (index, movie) => {
        output += `
          <div id="movieResult"  class="col-md-3" onclick="movieSelected('${movie.id}')">
            <div class="well text-center">
              <img src="${'http://image.tmdb.org/t/p/w500/'+movie.poster_path}">
              <h5>${movie.title}</h5>
            </div>
          </div>
        `;
      });

      $('#movies').html(output);
    })
    .catch((err) => {
      console.log(err);
    });
});

$(document).on("click", "#topCharts", function getTop(){
     document.getElementById("shareLink").innerHTML = "";
        document.getElementById("shareLink").style.padding = "0";

    document.getElementById("heading").innerHTML = "Top Rated Movies";
    axios.get('https://api.themoviedb.org/3/discover/movie?api_key=104e32522366bab70824b79d525c5c45&language=en-US&certification_country=US&sort_by=vote_average.desc')﻿
      .then((response) => {
        console.log(response);
        let movies = response.data.results;
        let output = '';
        $.each(movies, (index, movie) => {
          output += `
          <div id="movieResult"  class="col-md-3" onclick="movieSelected('${movie.id}')">
              <div class="well text-center">
                <img src="${'http://image.tmdb.org/t/p/w500/'+movie.poster_path}">
                <h5>${movie.title}</h5>
              </div>
            </div>
          `;
        });

        $('#movies').html(output);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  $(document).on("click", "#newReleases", function getNew(){
       document.getElementById("shareLink").innerHTML = "";
          document.getElementById("shareLink").style.padding = "0";

      document.getElementById("heading").innerHTML = "Newest Releases";
      axios.get('https://api.themoviedb.org/3/discover/movie?api_key=104e32522366bab70824b79d525c5c45&language=en-US&primary_release_date.gte=2018-03-15&primary_release_date.lte=2018-04-20')﻿
        .then((response) => {
          console.log(response);
          let movies = response.data.results;
          let output = '';
          $.each(movies, (index, movie) => {
            output += `
          <div id="movieResult"  class="col-md-3" onclick="movieSelected('${movie.id}')">
                <div class="well text-center">
                  <img src="${'http://image.tmdb.org/t/p/w500/'+movie.poster_path}">
                  <h5>${movie.title}</h5>
                </div>
              </div>
            `;
          });

          $('#movies').html(output);
        })
        .catch((err) => {
          console.log(err);
        });
    });

function getList(user_id, session_id){

    document.getElementById("heading").innerHTML = "Your List";
    


    session_id = sessionStorage.getItem("session_id");
    user_id = sessionStorage.getItem("user_id");
    username = sessionStorage.getItem("username");

    document.getElementById("shareLink").innerHTML = "Share your list with others: https://www.themoviedb.org/u/"+username+"/watchlist";
    document.getElementById("shareLink").style.padding = "20px";
   
    
    axios.get('https://api.themoviedb.org/3/account/' + user_id + '/watchlist/movies?api_key=104e32522366bab70824b79d525c5c45&language=en-US&session_id='+session_id+'&sort_by=created_at.asc&page=1')﻿
        .then((response) => {
          console.log(response);
        let entries = response.data.results;
        let output = '';
        $.each(entries, (index, entry) => {
            output += `
                    <div id="listResult">
                        <img src="${'http://image.tmdb.org/t/p/w500/'+entry.poster_path}" id="listPoster">
                        <h4 id="listTitle">${entry.title}</h4> 
                        <a onclick="removeFromList(${entry.id})" href="#" id="listRemove">Remove</a>
                        <h4 id="listRating">Rating: ${entry.vote_average}</h4>
                        
                    </div>
            `;
          });

          $('#movies').html(output);
        })
       .catch((err) => {
          console.log(err);
        });

    }




function getMovies(searchText){
    
    axios.get('https://api.themoviedb.org/3/search/movie?api_key=104e32522366bab70824b79d525c5c45&query=' +searchText)﻿

    .then((response) => {
      console.log(response);
      let movies = response.data.results;
      let output = '';
      $.each(movies, (index, movie) => {
        output += `
          <div id="movieResult"  class="col-md-3" onclick="movieSelected('${movie.id}')">
                <div class="well text-center">
                  <img src="${'http://image.tmdb.org/t/p/w500/'+movie.poster_path}">
                  <h5>${movie.title}</h5>
                </div>
              </div>
            `;
      });

      $('#movies').html(output);
    })
    .catch((err) => {
      console.log(err);
    });
}

function movieSelected(id){
    
    sessionStorage.setItem('movieId', id);
    getMovie();
     modal.style.display = "block";
  return false;
}

function getMovie(){
  let movieId = sessionStorage.getItem('movieId');

  axios.get('https://api.themoviedb.org/3/movie/'+movieId+'?api_key=104e32522366bab70824b79d525c5c45&language=en-US')
    .then((response) => {
      console.log(response);
      let movie = response.data;

      let output =`

        <div id="movieContent">
          <div id="moviePoster">
            <img src="${'http://image.tmdb.org/t/p/w500/'+movie.poster_path}" class="thumbnail">
          </div>
        
            <h2 id="movieTitle">${movie.title}</h2>
            <ul class="movie-details">
              <li class="movie-group-item" id="movieOverview"><strong>Synopsis:</strong> ${movie.overview}</li>
              <li class="movie-group-item" id="movieReleaseDate"><strong>Release date:</strong> ${movie.release_date}</li>
              <li class="movie-group-item" id="movieVoteAverage"><strong>Rated:</strong> ${movie.vote_average}</li>
              <li class="movie-group-item" id="movieVoteCount"><strong>Number of ratings:</strong> ${movie.vote_count}</li>
              <li class="movie-group-item" id="movieRuntime"><strong>Runtime:</strong> ${movie.runtime} minutes</li>
              <li class="movie-group-item" id="movieStatus"><strong>Status:</strong> ${movie.status}</li>
              <li class="movie-group-item" id="moviePopularity"><strong>Popularity Rank:</strong> ${movie.popularity}</li>
            </ul>
          </div>
      
          <div class="modal-buttons">
            <a href="#" id="modalClose">Close</a>
            <a onclick="addToList()" href="#" id="modalAdd">Add to my list</a>
          </div>
        
      `;

      $('#movie').html(output);
    })
    .catch((err) => {
      console.log(err);
    });
  }

function addToList(user_id, session_id, id){
    session_id = sessionStorage.getItem("session_id");
    user_id = sessionStorage.getItem("user_id");
    id = sessionStorage.getItem("movieId")
    axios.post('https://api.themoviedb.org/3/account/'+user_id+'/watchlist?session_id='+session_id+'&api_key=104e32522366bab70824b79d525c5c45', {
    "media_type": "movie",
    "media_id": id,
    "watchlist": true
})
    .then((response) => {
      console.log(response);    
    });
    
    alert( "Added to your list successfully!");
}
          
          
function removeFromList(id) {
    sessionStorage.setItem('movieId', id);
    session_id = sessionStorage.getItem("session_id");
    user_id = sessionStorage.getItem("user_id");
    axios.post('https://api.themoviedb.org/3/account/'+user_id+'/watchlist?session_id='+session_id+'&api_key=104e32522366bab70824b79d525c5c45', {
    "media_type": "movie",
    "media_id": id,
    "watchlist": false
})
    .then((response) => {
      console.log(response);    
    }); 
    
        alert( "Removed from your list successfully! The next time you visit your list, this movie will be gone!");
}
