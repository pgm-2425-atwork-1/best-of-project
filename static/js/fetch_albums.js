(async function fetchAlbums() {
  try {
      const response = await fetch(
          "https://www.pgm.gent/data/bestof2024/albums.json"
      );
      const data = await response.json();

      const albumsList = document.querySelector(".albums__list");

      data.forEach((album) => {

          const card = document.createElement("article");
          card.className = "albums__card";

          card.innerHTML = `
              <img src="${album.image}" alt="${album.artist} - ${album.title}">
              <h4>${album.artist} - ${album.title}</h4>
              <time>${album.release_date}</time>
              <div class="albums__tags">
                  <button class="albums__tag">${album.genre[0]}</button>
                  ${album.genre[1] ? `<button class="albums__tag">${album.genre[1]}</button>` : ""}
                  ${album.genre[2] ? `<button class="albums__tag">${album.genre[2]}</button>` : ""}
                  ${
                    album.genre[3]
                      ? `<span class="albums__separator"></span><button class="albums__tag">${album.genre[3]}</button>`
                      : ""
                  }
              </div>
          `;

          albumsList.appendChild(card);
      });
  } catch (error) {
      console.error("Error fetching albums data:", error);
  }
})();