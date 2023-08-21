
document.addEventListener("DOMContentLoaded", function () {
  //navigation search button

  const searchBtn = document.getElementById("searchBtn");
  const searchInput = document.getElementById("searchInput");

  searchBtn.addEventListener("click", () => {
    searchInput.classList.toggle("d-none");
    searchInput.focus();
  });

  //animations

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      console.log(entry);
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      } else {
        entry.target.classList.remove("show");
      }
    });
  });

  const hiddenElements = document.querySelectorAll(".hidden");
  hiddenElements.forEach((el) => observer.observe(el));

  // Sekcja Realizacje - zdjecia

  const imageContainer = document.querySelector(".gallery");
  const toggleButton = document.getElementById("rozwin");
  const images = imageContainer.querySelectorAll("img");
  const imagesToShow = 10;

  for (let i = imagesToShow; i < images.length; i++) {
    images[i].style.display = "none";
  }

  const masonry = new Macy({
    container: ".gallery",
    mobileFirst: true,
    columns: 2,
    breakAt: {
      600: 3,
      1200: 4,
    },
    margin: {
      x: 30,
      y: 30,
    },
  });

  var bef = document.querySelector(".gallery");

  toggleButton.addEventListener("click", function () {
    for (let i = imagesToShow; i < images.length; i++) {
      images[i].style.display = "block";
    }
    masonry.recalculate();
    toggleButton.style.display = "none";
    bef.classList.add("hidden-before");
  });
});

// Sekcja Realizacje - popup zdjec

const thumbnails = document.querySelectorAll(".thumbnail");
const popup = document.querySelector(".popup");
const popupImage = document.querySelector(".popup-image");
const closeBtn = document.querySelector(".close");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
let currentImageIndex = 0;

thumbnails.forEach((thumbnail, index) => {
  thumbnail.addEventListener("click", () => {
    const imageIndex = parseInt(thumbnail.getAttribute("index"));
    openPopup(imageIndex);
  });
});

function openPopup(imageIndex) {
  console.log("open")
  const thumbnail = thumbnails[imageIndex];
  const imageSrc = thumbnail.getAttribute("src");
  const altText = thumbnail.getAttribute("alt");

  popupImage.setAttribute("src", imageSrc);
  popupImage.setAttribute("alt", altText);
  currentImageIndex = imageIndex;
  popup.style.display = "block";
}

function closePopup() {
  popup.style.display = "none";
}

function showPreviousImage() {
  if (currentImageIndex > 0) {
    openPopup(currentImageIndex - 1);
  }
}

function showNextImage() {
  if (currentImageIndex < thumbnails.length - 1) {
    openPopup(currentImageIndex + 1);
  }
}

closeBtn.addEventListener("click", () => {
  closePopup();
});

prevBtn.addEventListener("click", () => {
  showPreviousImage();
});

nextBtn.addEventListener("click", () => {
  showNextImage();
});
