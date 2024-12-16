(function albums() {
  fetch("https://www.pgm.gent/data/bestof2024/albums.json")
    .then((response) => response.json())
    .then((data) => {
      const coverContainer = document.querySelector(".cover-container");

      data.forEach((album) => {
        const article = document.createElement("article");
        article.className = "cover";

        article.innerHTML = `
                    <img src="${album.image}" alt="${album.artist} - ${
          album.title
        }">
                    <p>${album.artist} - ${album.title}</p>
                    <time>${album.release_date}</time>
                    <div>
                       <button class="tag-buttons"> ${album.genre[0]}</button>
                     ${
                       album.genre[1]
                         ? `<button class="tag-buttons">${album.genre[1]}</button>`
                         : ""
                     }
                      ${
                        album.genre[2]
                          ? `<button class="tag-buttons">${album.genre[2]}</button>`
                          : ""
                      }
                       ${
                         album.genre[3]
                           ? `<button class="tag-buttons">${album.genre[3]}</button>`
                           : ""
                       }
                    </div>
                `;

        coverContainer.appendChild(article);
      });
    })
    .catch((error) =>
      console.log("There is an error with fetching data:", error)
    );
})();
