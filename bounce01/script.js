"use strict";

const themeButton = document.querySelector("#theme-toggle");
const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");

const profilePhoto = document.querySelector("#profile-photo");
const photoButton = document.querySelector("#photo-toggle");
const photoStatus = document.querySelector("#photo-status");

const photos = [
  {
    src: "assets/profile.jpg",
    alt: "Ahmed Alshoubaki in a casual photo",
    buttonText: "Show professional photo"
  },
  {
    src: "assets/professional.png",
    alt: "Ahmed Alshoubaki in a professional photo",
    buttonText: "Show casual photo"
  }
];

let currentPhoto = 0;

themeButton.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark-theme");

  themeButton.textContent = isDark ? "Light mode" : "Dark mode";
  themeButton.setAttribute("aria-pressed", String(isDark));
});

function waitForFade() {
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  return new Promise((resolve) => {
    window.setTimeout(resolve, reducedMotion ? 0 : 250);
  });
}

function loadPhoto(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();

    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Unable to load photo."));
    image.src = src;
  });
}

photoButton.addEventListener("click", async () => {
  const nextPhoto = (currentPhoto + 1) % photos.length;
  const photo = photos[nextPhoto];

  photoButton.disabled = true;
  photoStatus.textContent = "";

  try {
    // Load the next image before hiding the current one.
    await loadPhoto(photo.src);

    profilePhoto.classList.add("is-changing");
    await waitForFade();

    profilePhoto.src = photo.src;
    profilePhoto.alt = photo.alt;

    // Wait until the image is ready to display.
    await profilePhoto.decode();

    currentPhoto = nextPhoto;
    photoButton.textContent = photo.buttonText;
  } catch (error) {
    profilePhoto.src = photos[currentPhoto].src;
    profilePhoto.alt = photos[currentPhoto].alt;

    photoStatus.textContent =
      "Could not load the photo. Check its filename and path.";
  } finally {
    profilePhoto.classList.remove("is-changing");
    photoButton.disabled = false;
  }
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.querySelector("#name").value.trim();
  const email = document.querySelector("#email").value.trim();
  const message = document.querySelector("#message").value.trim();

  if (!name || !email || !message) {
    formStatus.textContent = "Please complete all fields.";
    return;
  }

  const recipient = contactForm.dataset.email;

  if (!recipient || recipient === "ahmad7raed77@example.com") {
    formStatus.textContent =
      "The portfolio owner needs to configure their contact email.";
    return;
  }

  const subject = encodeURIComponent(`Portfolio message from ${name}`);
  const body = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\n\n${message}`
  );

  formStatus.textContent =
    "Opening your email application. Send the message from there.";

  window.location.href =
    `mailto:${recipient}?subject=${subject}&body=${body}`;
});