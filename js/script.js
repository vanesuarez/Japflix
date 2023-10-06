document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("btnBuscar");
    const userInput = document.getElementById("inputBuscar");
    const container = document.getElementById("lista");
    let movies = [];

    fetch("https://japceibal.github.io/japflix_api/movies-data.json")
        .then((response) => response.json())
        .then((data) => {
          data.forEach((movie) => {
            movies.push(movie);
          });
          
          
          console.log(movies);
        });

  
    button.addEventListener("click", function () {
      const searchedMovie = userInput.value.toLowerCase()

      if (searchedMovie) {
        const filteredMovies = movies.filter(function (movie) {
          // Utilizar el método some para buscar en los géneros de cada película
          return (
            movie.title.toLowerCase().includes(searchedMovie) ||
            movie.tagline.toLowerCase().includes(searchedMovie) ||
            movie.overview.toLowerCase().includes(searchedMovie) ||
            movie.genres.some((genre) => genre.name.toLowerCase().includes(searchedMovie)
            )
          );
        });
            console.log(filteredMovies);

            container.innerHTML = ""

            // AGREGAR ACA FUNCION PARA MOSTRAR LAS PELICULAS
      }
  
      
    });
  });






