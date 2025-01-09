const apiUrl = "https://www.pgm.gent/data/bestof2024/tijdloze.json";
let items = [];

document.addEventListener("DOMContentLoaded", () => {
  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      items = data
        .filter((item) => item.position2024 > 0 && item.position2024 < 101)
        .sort((a, b) => a.position2024 - b.position2024);

      render();
    })
    .catch((error) => console.error("Error fetching data:", error));
});

function render() {
  const container = document.getElementById("top-100-content");
  container.innerHTML = "";

  items.forEach((song) => {
    const songElement = document.createElement("div");
    songElement.classList.add("song-item");
    songElement.innerHTML = `
            <p><strong>Positie:</strong> ${song.position2024}</p>
            <p><strong>Titel:</strong> ${song.song_title}</p>
            <p><strong>Artiest:</strong> ${song.name}</p>
            <p><strong>Album:</strong> ${song.album_title}</p>
            <p><strong>Release Datum:</strong> ${song.release_year}</p>
            <p><strong>Stijging/Daling:</strong> ${
              song.change > 0 ? `+${song.change}` : song.change
            }</p>
        `;
    container.appendChild(songElement);
  });
}
