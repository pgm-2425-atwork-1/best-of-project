(async function albums() {
  try {
    const response = await fetch(
      "https://www.pgm.gent/data/bestof2024/albums.json"
    );
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
    ${album.genre[1] ? `<button class="tag">${album.genre[1]}</button>` : ""}
    ${album.genre[2] ? `<button class="tag">${album.genre[2]}</button>` : ""}
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
