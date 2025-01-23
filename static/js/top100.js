const apiUrl = "https://www.pgm.gent/data/bestof2024/tijdloze.json"; 
const itemsPerPage = 20; 
let items = []; 
let currentList = "top"; 
let currentPage = 1; 


document.addEventListener("DOMContentLoaded", () => {
  console.log("Page loaded."); 
  fetchData();
  setupNavigation();
});


function fetchData() {
  console.log("Fetching data from API..."); 
  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      items = data;
      console.log("Data fetched successfully:", items); 
      render(); 
    })
    .catch((error) => console.error("Error fetching data:", error));
}

// navigatie instellen
function setupNavigation() {
  const buttons = document.querySelectorAll(".songs__button");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedList = button.id; 
      console.log("Button clicked:", selectedList); 

      if (currentList !== selectedList) {
        currentList = selectedList;
        currentPage = 1; 
        buttons.forEach((btn) => btn.classList.remove("songs__button-active"));
        button.classList.add("songs__button-active");
        console.log("Current list updated to:", currentList);
        render(); 
      } else {
      
        console.log("Re-rendering current list:", currentList); 
        render();
      }
    });
  });
}

function render() {
  console.log("Rendering list:", currentList);
  const filteredItems = filterItems(); 
  renderSongs(filteredItems); 
  renderPagination(filteredItems.length); 
}

function filterItems() {
  if (currentList === "top") {
    console.log("filtering 100 items"); 
    return items
      .filter((item) => item.position2024 > 0 && item.position2024 <= 100) 
      .sort((a, b) => a.position2024 - b.position2024); 
  }
  if (currentList === "new") {
    console.log("Filtering New In items"); 
    return items
      .filter(
        (item) =>
          item.position2024 > 0 &&
          item.position2024 <= 100 && 
          (!item.position2023 || item.position2023 === 0) 
      )
      .sort((a, b) => a.position2024 - b.position2024); 
  }
  return [];
}

function renderSongs(filteredItems) {
  const container = document.getElementById("top-100-content"); 
  container.innerHTML = ""; 

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginatedItems = filteredItems.slice(start, end); 

  paginatedItems.forEach((song) => {
    const songElement = document.createElement("div");
    songElement.classList.add("songs__list-item");

    const changeText =
      song.change > 0 ? `+${song.change}` : song.change < 0 ? song.change : "";

    songElement.innerHTML = `
      <div class="songs__place">${song.position2024 || "-"}</div>
      <div>
        <p class="songs__title">${song.song_title}</p>
        <p class="songs__artist">${song.name}</p>
        ${
          currentList === "top" && changeText
            ? `<p class="songs__change">${changeText}</p>`
            : ""
        }
      </div>
      <div class="songs__album">${song.album_title}</div>
      <div class="songs__release">${song.release_year}</div>
    `;
    container.appendChild(songElement);
  });
}


function renderPagination(totalItems) {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = ""; 

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (currentPage > 1) {
    const prevLink = document.createElement("a");
    prevLink.href = "#";
    prevLink.textContent = "« Previous";
    prevLink.addEventListener("click", (e) => {
      e.preventDefault();
      currentPage--;
      render();
    });
    pagination.appendChild(prevLink);
  }

  for (let i = 1; i <= totalPages; i++) {
    const pageLink = document.createElement("a");
    pageLink.href = "#";
    pageLink.textContent = i;
    if (i === currentPage) pageLink.classList.add("songs__pagination-active"); 
    pageLink.addEventListener("click", (e) => {
      e.preventDefault();
      currentPage = i;
      render();
    });
    pagination.appendChild(pageLink);
  }

  if (currentPage < totalPages) {
    const nextLink = document.createElement("a");
    nextLink.href = "#";
    nextLink.textContent = "Next »";
    nextLink.addEventListener("click", (e) => {
      e.preventDefault();
      currentPage++;
      render();
    });
    pagination.appendChild(nextLink);
  }
}