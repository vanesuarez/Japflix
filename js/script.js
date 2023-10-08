document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("btnBuscar");
    const userInput = document.getElementById("inputBuscar");
    const container = document.getElementById("lista");
    let movies = [];

    //Punto 1, carga la información de las películas sin mostrarlas
    fetch("https://japceibal.github.io/japflix_api/movies-data.json")
        .then((response) => response.json())
        .then((data) => {
          data.forEach((movie) => {
            movies.push(movie);
          });
          console.log(movies);
        });

        // FIN parte 1

    //Punto 2, buscar las películas.
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

            filteredMovies.forEach( x => {

              const title = x.title;
              const tagline = x.tagline;
              const vote = x.vote_average;
              const id = x.id;

              const tarjetaBtn = document.createElement("button"); // crea un botón para cada pelicula del array filtrado
              tarjetaBtn.setAttribute("id", id); // agregamos la id de la pelicula al elemento
              tarjetaBtn.setAttribute("data-bs-toggle", "offcanvas"); // agrega atributos de boostrap para que funcione el top
              tarjetaBtn.setAttribute("data-bs-target", "#offcanvasTop");
              tarjetaBtn.setAttribute("aria-controls", "offcanvasTop"); 

              const tarjeta = document.createElement("li"); // crea un elemento li
              tarjeta.classList.add("list-group-item"); // agrega clases boostrap
              tarjeta.classList.add("d-flex") ;
              tarjeta.classList.add("justify-content-between");
              tarjeta.classList.add("bg-dark");
              tarjeta.classList.add("text-white");
              tarjeta.innerHTML = // agrega contenido a la tarjeta de la pelicula, nombre y descripción 
              `<div class="p-2 bd-highlight">
              <h5> ${title}</h5>
              <p> ${tagline}</p>
              </div>`

              // if que agrega estrellas segun su puntaje
              if (vote<=10 && vote>8) { // muestra las 5 estrellas
                tarjeta.innerHTML += `<div class="ms-auto p-2 bd-highlight">
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
              </div>`
              } else if (vote<=8 && vote>6) { // muestra 4 estrellas de 5
                tarjeta.innerHTML += `<div class="ms-auto p-2 bd-highlight">
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star"></span>
              </div>`
              } else if (vote<=6 && vote>4) { // muestra 3 estrellas de 5
                tarjeta.innerHTML += `<div class="ms-auto p-2 bd-highlight">
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>
              </div>`
              } else if (vote<=4 && vote>2) { // muestra 2 estrellas de 5
                tarjeta.innerHTML += `<div class="ms-auto p-2 bd-highlight">
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>
              </div>`
              } else if (vote<=2 && vote>0) { // muestra 1 estrella de 5
                tarjeta.innerHTML += `<div class="ms-auto p-2 bd-highlight">
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>
              </div>`
              }

              lista.appendChild(tarjetaBtn);
              tarjetaBtn.appendChild(tarjeta);

              // FIN parte 2

              //Punto 3, Cuando el usuario pulse en alguna de las películas mostradas, se deberá desplegar un contenedor superior con la siguiente información de dicha película: title, overview y lista de genres.
              tarjetaBtn.addEventListener("click", () => {
                const titleM = document.getElementById('offcanvasTopLabel'); // selecciona los elementos de contenedor top que se desplegara
                const overviewM = document.getElementById('overviewM');
                const genresM = document.getElementById('genresM');
            
                titleM.innerHTML = title; // agrega el titulo de la pelicula seleccionada en el contenedor desplegado top
                overviewM.innerHTML = tagline; // agrega el descripción de la pelicula seleccionada en el contenedor desplegado top
                
                genresM.innerHTML = ``;

                for(i=0;i<x.genres.length-1;i++) { // agrega todos los generos menos el último, para que no quede el guion final
                  genresM.innerHTML += `${x.genres[i].name} - `
                };

                genresM.innerHTML += `${x.genres[x.genres.length-1].name}`; // escribe el último

              // FIN parte 3
              // Punto 4, Añadir en lo anterior un botón con un desplegable que contenga el año de lanzamiento (sin el mes ni el día), la duración del largometraje, el presupuesto con el que contó y las ganancias obtenidas

              genresM.innerHTML += // agrega el boton final con la info extra de la pelicula
               `
              <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  More
                </button>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="#">Year: ${x.release_date.substring(0, 4)}</a></li>
                  <li><a class="dropdown-item" href="#">Runtime: ${x.runtime} min.</a></li>
                  <li><a class="dropdown-item" href="#">Budget: $${x.budget}</a></li>
                  <li><a class="dropdown-item" href="#">Revenue: $${x.revenue}</a></li>
                </ul>
              </div>
              `
              // FIN parte 4
              // substring(0, 4) indica que solo quiero escribir las primeras 4 letras de en este caso, la fecha
              });
            })
      }
    })
});
