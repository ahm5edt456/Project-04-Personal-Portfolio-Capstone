"use strict";

const themeButton = document.querySelector("#theme-toggle");
const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");

themeButton.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark-theme");

  themeButton.textContent = isDark ? "Light mode" : "Dark mode";
  themeButton.setAttribute("aria-pressed", String(isDark));
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const nameInput = document.querySelector("#name");
  const emailInput = document.querySelector("#email");
  const messageInput = document.querySelector("#message");

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const message = messageInput.value.trim();

  if (!name || !email || !message) {
    formStatus.textContent = "Please complete all fields.";
    return;
  }

  const recipient = contactForm.dataset.email;

  if (!recipient || recipient === "your-email@example.com") {
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