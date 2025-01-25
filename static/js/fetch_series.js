(async function fetchSeries() {
  const url = "https://www.pgm.gent/data/bestof2024/series.json";
  try {
    const response = await fetch(url);
    const series = await response.json();

    const $container = document.querySelector(".series__list");

    series.forEach((serie) => {
      const serieCard = document.createElement("div");
      serieCard.className = "card";

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

      $container.appendChild(serieCard);
    });
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
})();
