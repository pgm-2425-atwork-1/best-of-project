// honorable mentions

document.addEventListener("DOMContentLoaded", () => {
    const images = document.querySelectorAll(".gallery img");
    const lightbox = document.getElementById("lb-back");
    const lightboxImg = document.querySelector(".lb-img img");
  
    images.forEach((img) => {
      img.addEventListener("click", () => {
        lightbox.style.display = "flex"; 
        lightboxImg.src = img.src; 
        lightboxImg.alt = img.alt; 
      });
    });
  
    lightbox.addEventListener("click", (e) => {
      if (e.target !== lightboxImg) {
        lightbox.style.display = "none"; 
      }
    });
  });