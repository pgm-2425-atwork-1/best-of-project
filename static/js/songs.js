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
  const $buttons = document.querySelectorAll(".songs__button");
  $buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedList = button.id; 
      console.log("Button clicked:", selectedList); 

      if (currentList !== selectedList) {
        currentList = selectedList;
        currentPage = 1; 
        $buttons.forEach((btn) => btn.classList.remove("songs__button-active"));
        button.classList.add("songs__button-active");
        console.log("list updated to:", currentList);
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
  const $container = document.getElementById("top-100-content"); 
  $container.innerHTML = ""; 

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
      <div class="songs__album">
    <svg class="songs__album-icon" width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.125 0C6.51803 0 4.94714 0.476523 3.611 1.36931C2.27485 2.2621 1.23344 3.53105 0.618482 5.0157C0.00352044 6.50035 -0.157382 8.13401 0.156123 9.71011C0.469628 11.2862 1.24346 12.7339 2.37976 13.8702C3.51606 15.0065 4.9638 15.7804 6.53989 16.0939C8.11599 16.4074 9.74966 16.2465 11.2343 15.6315C12.719 15.0166 13.9879 13.9752 14.8807 12.639C15.7735 11.3029 16.25 9.73197 16.25 8.125C16.2477 5.97081 15.391 3.90551 13.8677 2.38227C12.3445 0.85903 10.2792 0.00227486 8.125 0ZM8.125 15C6.76526 15 5.43605 14.5968 4.30546 13.8414C3.17487 13.0859 2.29368 12.0122 1.77333 10.7559C1.25298 9.49971 1.11683 8.11737 1.3821 6.78375C1.64738 5.45013 2.30216 4.22513 3.26364 3.26364C4.22513 2.30215 5.45014 1.64737 6.78376 1.3821C8.11738 1.11683 9.49971 1.25298 10.756 1.77333C12.0122 2.29368 13.0859 3.17487 13.8414 4.30545C14.5968 5.43604 15 6.76525 15 8.125C14.9979 9.94773 14.2729 11.6952 12.9841 12.9841C11.6952 14.2729 9.94773 14.9979 8.125 15ZM8.125 3.75C6.96506 3.75124 5.85298 4.21258 5.03278 5.03278C4.21258 5.85298 3.75124 6.96506 3.75 8.125C3.75 8.29076 3.68416 8.44973 3.56695 8.56694C3.44973 8.68415 3.29076 8.75 3.125 8.75C2.95924 8.75 2.80027 8.68415 2.68306 8.56694C2.56585 8.44973 2.5 8.29076 2.5 8.125C2.50166 6.63366 3.09482 5.20389 4.14936 4.14935C5.20389 3.09482 6.63367 2.50165 8.125 2.5C8.29076 2.5 8.44974 2.56585 8.56695 2.68306C8.68416 2.80027 8.75 2.95924 8.75 3.125C8.75 3.29076 8.68416 3.44973 8.56695 3.56694C8.44974 3.68415 8.29076 3.75 8.125 3.75ZM13.75 8.125C13.7483 9.61634 13.1552 11.0461 12.1007 12.1006C11.0461 13.1552 9.61634 13.7483 8.125 13.75C7.95924 13.75 7.80027 13.6842 7.68306 13.5669C7.56585 13.4497 7.5 13.2908 7.5 13.125C7.5 12.9592 7.56585 12.8003 7.68306 12.6831C7.80027 12.5658 7.95924 12.5 8.125 12.5C9.28494 12.4988 10.397 12.0374 11.2172 11.2172C12.0374 10.397 12.4988 9.28494 12.5 8.125C12.5 7.95924 12.5659 7.80027 12.6831 7.68306C12.8003 7.56585 12.9592 7.5 13.125 7.5C13.2908 7.5 13.4497 7.56585 13.5669 7.68306C13.6842 7.80027 13.75 7.95924 13.75 8.125ZM10.625 8.125C10.625 7.63055 10.4784 7.1472 10.2037 6.73607C9.92897 6.32495 9.53853 6.00452 9.08171 5.8153C8.6249 5.62608 8.12223 5.57657 7.63728 5.67304C7.15233 5.7695 6.70687 6.0076 6.35724 6.35723C6.00761 6.70686 5.7695 7.15232 5.67304 7.63727C5.57658 8.12223 5.62609 8.62489 5.8153 9.08171C6.00452 9.53852 6.32496 9.92897 6.73608 10.2037C7.1472 10.4784 7.63055 10.625 8.125 10.625C8.78804 10.625 9.42393 10.3616 9.89277 9.89277C10.3616 9.42393 10.625 8.78804 10.625 8.125ZM6.875 8.125C6.875 7.87777 6.94831 7.6361 7.08567 7.43054C7.22302 7.22498 7.41824 7.06476 7.64665 6.97015C7.87506 6.87554 8.12639 6.85079 8.36887 6.89902C8.61134 6.94725 8.83407 7.0663 9.00889 7.24112C9.1837 7.41593 9.30275 7.63866 9.35099 7.88114C9.39922 8.12361 9.37446 8.37495 9.27985 8.60335C9.18524 8.83176 9.02503 9.02699 8.81947 9.16434C8.61391 9.30169 8.37223 9.375 8.125 9.375C7.79348 9.375 7.47554 9.2433 7.24112 9.00888C7.0067 8.77446 6.875 8.45652 6.875 8.125Z" fill="#A0A4AE"/>
    </svg>
       ${song.album_title}
</div>
      <div class="songs__release">${song.release_year}</div>
    `;
    $container.appendChild(songElement);
  });
}


function renderPagination(totalItems) {
  const $pagination = document.getElementById("pagination");
  $pagination.innerHTML = ""; 

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
    $pagination.appendChild(prevLink);
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
    $pagination.appendChild(pageLink);
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
    $pagination.appendChild(nextLink);
  }
}