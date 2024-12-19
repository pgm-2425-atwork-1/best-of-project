// fetch albums

(async function albums() {
  try {
    const response = await fetch("https://www.pgm.gent/data/bestof2024/albums.json");
    const data = await response.json();

    const coverContainer = document.querySelector(".cover-container");

    data.forEach((album) => {
      const article = document.createElement("article");
      article.className = "cover";

      article.innerHTML = `
        <img src="${album.image}" alt="${album.artist} - ${album.title}">
        <h4>${album.artist} - ${album.title}</h4>
        <time>${album.release_date}</time>
  <div class="tags">
    <button class="tag">${album.genre[0]}</button>
    ${
      album.genre[1]
        ? `<button class="tag">${album.genre[1]}</button>`
        : ""
    }
    ${
      album.genre[2]
        ? `<button class="tag">${album.genre[2]}</button>`
        : ""
    }
    ${
      album.genre[3]
        ? `<span class="separator"></span><button class="tag">${album.genre[3]}</button>`
        : ""
    }
  </div>
      `;

      coverContainer.appendChild(article);
    });
  } catch (error) {
    console.log("There is an error with fetching data:", error);
  }
})();


// fetch movies 

(async function fetchMovies() {
  const url = "https://www.pgm.gent/data/bestof2024/movies.json";
  try {
    const response = await fetch(url);
    const movies = await response.json();

    const container = document.querySelector(".movie-data");

    movies.forEach(movie => {
      const movieCard = document.createElement("div");
      movieCard.className = "movie-card";

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

// fetch series

(async function fetchSeries() {
  const url = "https://www.pgm.gent/data/bestof2024/series.json";
  try {
    const response = await fetch(url);
    const series = await response.json();

    const container = document.querySelector(".series-data");

    series.forEach(serie => {
      const serieCard = document.createElement("div");
      serieCard.className = "serie-card";

      serieCard.innerHTML = `
        <img src="${serie.image}" alt="${serie.title}">
        <div class="serie-info">
          <h4>${serie.title}</h4>
          <button class="streaming"><a href="#" target="_blank">Netflix</a></button>
          <p>${serie.short_description}</p>
          <div>
            <button><a href="${serie.trailer_link}" target="_blank">Trailer</a></button>
            <button><a href="${serie.imdb_link}" target="_blank">IMDB</a></button>
          </div>
        </div>
      `;

      container.appendChild(serieCard);
    });
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
})();

// fetch games

