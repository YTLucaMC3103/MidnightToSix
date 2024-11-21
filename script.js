// Smooth scrolling for all links
document.querySelectorAll(".navbar a").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});
function openNav() {
  document.getElementById("mySidebar").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidebar").style.width = "0";
}

document.addEventListener("DOMContentLoaded", (event) => {
  const audioElements = document.querySelectorAll(".audio-element");
  let currentAudio = null;

  audioElements.forEach((audio, index) => {
    audio.addEventListener("play", () => {
      if (currentAudio && currentAudio !== audio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
      }
      currentAudio = audio;
    });

    audio.addEventListener("ended", () => {
      if (index + 1 < audioElements.length) {
        audioElements[index + 1].play();
      }
    });
  });

  const photoContainer = document.getElementById("photoContainer");
  const photos = Array.from(photoContainer.querySelectorAll("img"));
  const lightbox = document.createElement("div");
  const lightboxImg = document.createElement("img");
  const closeBtn = document.createElement("span");

  lightbox.classList.add("lightbox");
  closeBtn.classList.add("close-btn");
  closeBtn.innerHTML = "&times;";

  lightbox.appendChild(lightboxImg);
  lightbox.appendChild(closeBtn);
  document.body.appendChild(lightbox);

  photos.forEach((photo) => {
    photo.addEventListener("click", () => {
      lightboxImg.src = photo.src;
      lightbox.classList.add("active");
      document.body.classList.add("blur");
    });
  });

  closeBtn.addEventListener("click", () => {
    lightbox.classList.remove("active");
    document.body.classList.remove("blur");
  });

  function arrangePhotos() {
    const containerWidth = photoContainer.offsetWidth;
    const photoWidth = photos[0].offsetWidth;
    const photoHeight = photos[0].offsetHeight;
    const cols = Math.floor(containerWidth / photoWidth);
    const rows = Math.ceil(photos.length / cols);
    const containerHeight = rows * photoHeight;

    photoContainer.style.height = `${containerHeight}px`;

    photos.forEach((photo, index) => {
      const col = index % cols;
      const row = Math.floor(index / cols);

      const left = col * photoWidth;
      const top = row * photoHeight;

      photo.style.position = "absolute";
      photo.style.left = `${left}px`;
      photo.style.top = `${top}px`;
    });
  }

  function arrangePhotosForSmallScreens() {
    let totalHeight = 0;
    photos.forEach((photo) => {
      photo.style.position = "relative";
      photo.style.left = "0px";
      photo.style.top = "0px";
      totalHeight += photo.offsetHeight;
    });
    photoContainer.style.height = `${totalHeight}px`;
  }

  function updatePhotoArrangement() {
    if (window.innerWidth > 600) {
      arrangePhotos();
    } else {
      arrangePhotosForSmallScreens();
    }
  }

  window.addEventListener("resize", updatePhotoArrangement);
  updatePhotoArrangement();
});
function getBerlinDate() {
  // Definiere die Zeitzone für Berlin
  const berlinTimeZone = 'Europe/Berlin';

  // Hole das aktuelle Datum und die Uhrzeit in der definierten Zeitzone
  const berlinDate = new Date().toLocaleString('de-DE', { timeZone: berlinTimeZone });

  // Gib das Datum und die Uhrzeit im gewünschten Format aus
  document.getElementById('berlinDate').textContent = berlinDate;
}
function markEvents() {
  const events = document.querySelectorAll('.event');
  const today = new Date().toISOString().split('T')[0]; // Aktuelles Datum im Format YYYY-MM-DD

  events.forEach(event => {
      const eventDate = event.getAttribute('data-date');

      if (eventDate < today) {
          event.classList.add('past');
      } else if (eventDate === today) {
          event.classList.add('today');
      } else {
          event.classList.add('upcoming');
      }
  });
}

document.addEventListener('DOMContentLoaded', markEvents);

function openMailClient(event, email) {
  event.preventDefault();
  window.open(`mailto:${email}`, '_blank');
}