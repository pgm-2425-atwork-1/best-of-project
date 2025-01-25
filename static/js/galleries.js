// slideshow gallery
document.addEventListener("DOMContentLoaded", () => {
  const $slideshowContainer = document.querySelector(".slightshow__container");
  const $nextBtn = document.getElementById("nextBtn"); 
  const jsonUrl = "https://www.pgm.gent/data/bestof2024/games.json";

  let slideIndex = 0;
  let $slides;

  fetch(jsonUrl)
    .then((response) => response.json())
    .then((data) => {
      const selectedGames = data.slice(0, 3);

      selectedGames.forEach((game) => {
        const slide = document.createElement("div");
        slide.classList.add("slightshow__container-item");

        const img = document.createElement("img");
        img.src = game.image;
        img.alt = game.title;

        const title = document.createElement("figcaption");
        title.classList.add("gallery__caption");
        title.textContent = game.title;
        

        slide.appendChild(img);
        slide.appendChild(title);
        $slideshowContainer.appendChild(slide);
      });

      $slides = document.querySelectorAll(".slightshow__container-item");
      updateSlideshowContainer();
    })
    .catch((error) => console.error("Error loading JSON data:", error));

  function updateSlideshowContainer() {
    const translateX = -slideIndex * 100;
    $slideshowContainer.style.transform = `translateX(${translateX}%)`;
  }

  function changeSlide(step) {
    if ($slides) {
      slideIndex = (slideIndex + step + $slides.length) % $slides.length;
      updateSlideshowContainer();
    } else {
      console.error("Slides are not yet active.");
    }
  }

  $nextBtn?.addEventListener("click", () => changeSlide(1));
});



// lightbox gallery 
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll(".gallery img");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.querySelector(".lightbox__image");
  const closeButton = document.querySelector(".lightbox__close");

  images.forEach((img) => {
    img.addEventListener("click", () => {
      lightbox.style.display = "flex";
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
    });
  });

  closeButton.addEventListener("click", () => {
    lightbox.style.display = "none";
  });

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox && e.target !== lightboxImg) {
      lightbox.style.display = "none";
    }
  });
});
