(async function fetchMovies() {
  const url = "https://www.pgm.gent/data/bestof2024/movies.json";
  try {
    const response = await fetch(url);
    const movies = await response.json();

    const container = document.querySelector(".movies__list");

    movies.forEach((movie) => {
      const movieCard = document.createElement("div");
      movieCard.className = "card";

      movieCard.innerHTML = `
          <img src="${movie.image}" alt="${movie.title}">
          <div class="movie-info">
            <h4>${movie.title}</h4>
            <p>${movie.short_description}</p>
            <div>
              <button><a href="${movie.trailer_link}" target="_blank">Trailer</a></button>
              <button><a href="${movie.imdb_link}" target="_blank">IMDB</a></button>
            </div>
          </div>
        `;

      container.appendChild(movieCard);
    });
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
})();
