document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("btnBuscar");
  const userInput = document.getElementById("inputBuscar");
  let movies = [];
  let filteredMovies = [];

  fetch("https://japceibal.github.io/japflix_api/movies-data.json")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((movie) => {
        movies.push(movie);
      });


      console.log(movies);
    });


  button.addEventListener("click", function () {
    const searchedMovie = userInput.value.toLowerCase();

    if (searchedMovie) {
      filteredMovies = movies.filter(function (movie) {
        // Utilizar el método some para buscar en los géneros de cada película
        return (
          movie.title.toLowerCase().includes(searchedMovie) ||
          movie.tagline.toLowerCase().includes(searchedMovie) ||
          movie.overview.toLowerCase().includes(searchedMovie) ||
          movie.genres.some((genre) => genre.name.toLowerCase().includes(searchedMovie))
        );
      });
      movieslist(filteredMovies);
    } else {
      alert('Error');
    }
  });
});

function movieslist(array){
  const conteiner = document.getElementById('lista');
  conteiner.innerHTML = '';
  array.forEach(element => {
      let stars = [];
      for(let i=0; i<5; i++){
          if(i<Math.round(element.vote_average/2)){
              stars.push('<span class="fa fa-star checked"></span>')
          }else{
              stars.push('<span class="fa fa-star"></span>')
          }
      }
      conteiner.innerHTML +=`
      <li class="list-group-item d-flex justify-content-between bg-dark text-white" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" onclick=info(${element.id})>
      <div class="p-2 bd-highlight">
          <h5>${element.title}</h5>
          <p>${element.tagline}</p>
        </div>
        <div class="ms-auto p-2 bd-highlight">
          ${stars[0]}
          ${stars[1]}
          ${stars[2]}
          ${stars[3]}
          ${stars[4]}
        </div>
      </li>
      `;
  });
}

// Parte 3 y 4
function infomovies(id) {
  const titlemovie = document.getElementById('titlemovie');
  const paramovie = document.getElementById('paramovie');
  const offcanvas = document.getElementById('offcanvas-body');
  const listdrop = document.getElementById('listdrop');

  let moviesinfo = {};
  filteredMovies.forEach((element) => {
    if (element.id == id) { 
      moviesinfo = element; 
    }
  });

  titlemovie.innerHTML = `${moviesinfo.title}`;
  paramovie.innerHTML = `${moviesinfo.overview}`;
  offcanvas.innerHTML = '';
  listdrop.innerHTML = '';

  for (let i = 0; i < moviesinfo.genres.length; i++) {
    offcanvas.innerHTML += `
        <p class="text-secondary">- ${moviesinfo.genres[i].name} -</p>
        `;
  }

  listdrop.innerHTML += `
        <li class="d-flex justify-content-between"><p>Year:</p><p>${moviesinfo.release_date.slice(0, 4)}</p></li>
        <li class="d-flex justify-content-between"><p>Runtime:</p><p>${moviesinfo.runtime} mins</p></li>
        <li class="d-flex justify-content-between"><p>Budget:</p><p>${moviesinfo.budget}</p></li>
        <li class="d-flex justify-content-between"><p>Revenue:</p><p>${moviesinfo.revenue}</p></li>
    `;
}






