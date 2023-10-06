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

          const searchFilter = movies.filter(function (movie) {
              return (
                movie.title.toLowerCase().includes(searchedMovie) ||   
                movie.tagline.toLowerCase().includes(searchedMovie) ||
                movie.overview.toLowerCase().includes(searchedMovie)
              );
            });
            console.log(searchFilter);

      }
  
      
    });
  });
  



        
      
        // console.log(searchFilter);

        //  container.innerHTML = "";


    // GUARDAR VARIABLE DE LA DATA DEL ARRAY DE MODO GLOBAL
    // USAR METODO INCLUDES EN EL IF CON TO UPERCASE O TOLOWERCASE
    // USAR METODO EVERY PARA RECORRER EL ARRAY GENRE




    

// async function fetchData() {
//     let result = [];
//     try {
//       const response = await fetch(url);
//       result = await response.json();
//     } catch (error) {
//       alert(error);
//     }
//     return result;
//   }

//   async function showMovies() {
//     try {
//         let movies = await fetchData();
//         const list = document.getElementById("lista");
//         list.innerHTML = "";

//         // const searchedMovies = [];
//         // movies.forEach((movie) => {
//         //   if (movies.title === userInput || movies.genre === userInput || movies. ) {
//         //     list.innerHTML += `<li>${product.title}: $${product.price}</li>`;
//         //     // El método push agrega un elemento al final del array
//         //     filteredProducts.push(product);
//         //   }
//         // });

//     }

//     catch (error) {
//     console.log(error);
//   }
// }
