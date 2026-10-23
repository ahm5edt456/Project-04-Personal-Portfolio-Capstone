"use strict";

const themeButton = document.querySelector("#theme-toggle");
const languageButton = document.querySelector("#language-toggle");
const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");

const profilePhoto = document.querySelector("#profile-photo");
const photoButton = document.querySelector("#photo-toggle");
const photoStatus = document.querySelector("#photo-status");

let currentLanguage = "en";
let currentPhoto = 0;
let photoBusy = false;
let photoFailed = false;
let formState = "";

const photos = [
  "assets/profile.jpg",
  "assets/professional.png"
];

const translations = {
  en: {
    title: "Ahmed Alshoubaki | Portfolio",
    logo: "Ahmed",
    navigation: ["About", "Skills", "Projects", "Hobbies", "Contact"],
    themeDark: "Dark mode",
    themeLight: "Light mode",
    language: "العربية",
    role: "IT STUDENT & DEVELOPER",
    greeting: "Hi, I'm ",
    name: "Ahmed Alshoubaki.",
    about:
      "I am an IT student specializing in artificial intelligence " +
      "and a learner at 42. I enjoy solving problems, learning new " +
      "technologies, and building projects that improve my skills.",
    actions: ["Explore my projects", "Contact me"],
    skillsEyebrow: "WHAT I USE",
    skillsTitle: "My skills",
    skills: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Python",
      "C++",
      "Git & GitHub",
      "Linux",
      "Problem solving"
    ],
    projectsEyebrow: "MY LEARNING JOURNEY",
    projectsTitle: "Project showcase",
    projectNumbers: [
      "PROJECT 00",
      "PROJECT 01",
      "PROJECT 02",
      "PROJECT 03"
    ],
    projectTitles: [
      "Linux, Git & GitHub",
      "HTML Fundamentals",
      "CSS Visual Presentation",
      "JavaScript Interactivity"
    ],
    projectDescriptions: [
      "Practicing Linux terminal commands, file management, " +
        "and version control with Git and GitHub.",
      "Building structured web pages using semantic HTML, " +
        "links, images, and forms.",
      "Styling web pages with colors, typography, " +
        "spacing, and responsive layouts.",
      "Adding interaction through events, functions, " +
        "and DOM manipulation."
    ],
    repository: "View repository ↗",
    repositoryLabels: [
      "View Project 00 repository (opens in a new tab)",
      "View Project 01 repository (opens in a new tab)",
      "View Project 02 repository (opens in a new tab)",
      "View Project 03 repository (opens in a new tab)"
    ],
    hobbiesEyebrow: "BEYOND THE CODE",
    hobbiesTitle: "My hobbies",
    hobbies: [
      "Solving programming challenges",
      "Developing games",
      "Customizing my Linux setup"
    ],
    contactEyebrow: "LET'S CONNECT",
    contactTitle: "Contact me",
    contactDescription:
      "Fill out the form to prepare a message in your email application.",
    labels: ["Name", "Email", "Message"],
    submit: "Open email app",
    footer:
      "© 2026 Ahmed Alshoubaki. Built with HTML, CSS and JavaScript.",
    github: "GitHub",
    back: "Back to top ↑",
    photoButtons: [
      "Show professional photo",
      "Show casual photo"
    ],
    photoAlts: [
      "Ahmed Alshoubaki in a casual photo",
      "Ahmed Alshoubaki in a professional photo"
    ],
    photoError: "Could not load the photo. Check its filename and path.",
    formRequired: "Please complete all fields.",
    formOpening:
      "Opening your email application. Send the message from there.",
    emailSubject: "Portfolio message from",
    emailName: "Name",
    emailAddress: "Email"
  },

  ar: {
    title: "أحمد الشوبكي | معرض أعمالي",
    logo: "أحمد",
    navigation: ["عني", "المهارات", "المشاريع", "الهوايات", "تواصل معي"],
    themeDark: "الوضع الداكن",
    themeLight: "الوضع الفاتح",
    language: "English",
    role: "طالب تكنولوجيا معلومات ومطوّر",
    greeting: "مرحبًا، أنا ",
    name: "أحمد الشوبكي.",
    about:
      "أنا طالب تكنولوجيا معلومات متخصص في الذكاء الاصطناعي " +
      "ومتعلم في مدرسة 42. أستمتع بحل المشكلات وتعلم التقنيات " +
      "الجديدة وبناء المشاريع التي تطوّر مهاراتي.",
    actions: ["استكشف مشاريعي", "تواصل معي"],
    skillsEyebrow: "التقنيات التي أستخدمها",
    skillsTitle: "مهاراتي",
    skills: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Python",
      "C++",
      "Git وGitHub",
      "Linux",
      "حل المشكلات"
    ],
    projectsEyebrow: "رحلتي التعليمية",
    projectsTitle: "معرض المشاريع",
    projectNumbers: [
      "المشروع 00",
      "المشروع 01",
      "المشروع 02",
      "المشروع 03"
    ],
    projectTitles: [
      "Linux وGit وGitHub",
      "أساسيات HTML",
      "التصميم باستخدام CSS",
      "التفاعل باستخدام JavaScript"
    ],
    projectDescriptions: [
      "التدرب على أوامر Linux وإدارة الملفات والتحكم " +
        "بالإصدارات باستخدام Git وGitHub.",
      "بناء صفحات ويب منظمة باستخدام عناصر HTML الدلالية " +
        "والروابط والصور والنماذج.",
      "تنسيق صفحات الويب باستخدام الألوان والخطوط " +
        "والمسافات والتصميم المتجاوب.",
      "إضافة التفاعل باستخدام الأحداث والدوال " +
        "والتعديل على عناصر الصفحة."
    ],
    repository: "عرض المستودع ↗",
    repositoryLabels: [
      "عرض مستودع المشروع 00، يفتح في تبويب جديد",
      "عرض مستودع المشروع 01، يفتح في تبويب جديد",
      "عرض مستودع المشروع 02، يفتح في تبويب جديد",
      "عرض مستودع المشروع 03، يفتح في تبويب جديد"
    ],
    hobbiesEyebrow: "بعيدًا عن البرمجة",
    hobbiesTitle: "هواياتي",
    hobbies: [
      "حل التحديات البرمجية",
      "تطوير الألعاب",
      "تخصيص بيئة Linux الخاصة بي"
    ],
    contactEyebrow: "لنتواصل",
    contactTitle: "تواصل معي",
    contactDescription:
      "املأ النموذج لتجهيز رسالة في تطبيق البريد الإلكتروني.",
    labels: ["الاسم", "البريد الإلكتروني", "الرسالة"],
    submit: "فتح تطبيق البريد",
    footer:
      "© 2026 أحمد الشوبكي. بُني باستخدام HTML وCSS وJavaScript.",
    github: "GitHub",
    back: "العودة للأعلى ↑",
    photoButtons: [
      "عرض الصورة الرسمية",
      "عرض الصورة العادية"
    ],
    photoAlts: [
      "أحمد الشوبكي في صورة عادية",
      "أحمد الشوبكي في صورة رسمية"
    ],
    photoError: "تعذّر تحميل الصورة. تأكد من اسم الملف ومساره.",
    formRequired: "يرجى تعبئة جميع الحقول.",
    formOpening:
      "جارٍ فتح تطبيق البريد. أرسل الرسالة من خلاله.",
    emailSubject: "رسالة من معرض الأعمال من",
    emailName: "الاسم",
    emailAddress: "البريد الإلكتروني"
  }
};

function setText(selector, value) {
  document.querySelector(selector).textContent = value;
}

function setTexts(selector, values) {
  document.querySelectorAll(selector).forEach((element, index) => {
    element.textContent = values[index];
  });
}

function updateThemeButton() {
  const text = translations[currentLanguage];
  const isDark = document.body.classList.contains("dark-theme");

  themeButton.textContent = isDark ? text.themeLight : text.themeDark;
  themeButton.setAttribute("aria-pressed", String(isDark));
}

function updatePhotoText() {
  const text = translations[currentLanguage];

  profilePhoto.alt = text.photoAlts[currentPhoto];
  photoButton.textContent = text.photoButtons[currentPhoto];
  photoStatus.textContent = photoFailed ? text.photoError : "";
}

function updateFormStatus() {
  const text = translations[currentLanguage];

  formStatus.textContent = formState ? text[formState] : "";
}

function applyLanguage() {
  const text = translations[currentLanguage];
  const isArabic = currentLanguage === "ar";

  document.documentElement.lang = currentLanguage;
  document.documentElement.dir = isArabic ? "rtl" : "ltr";
  document.title = text.title;

  languageButton.textContent = text.language;
  languageButton.lang = isArabic ? "en" : "ar";

  const logo = document.querySelector(".logo");
  const logoDot = document.createElement("span");

  logoDot.textContent = ".";
  logo.textContent = text.logo;
  logo.append(logoDot);

  setTexts(".nav-links a", text.navigation);

  setText("#about .eyebrow", text.role);

  const heading = document.querySelector("#about-title");
  const highlightedName = document.createElement("span");

  highlightedName.textContent = text.name;
  heading.textContent = text.greeting;
  heading.append(highlightedName);

  setText("#about .about-content > p:not(.eyebrow)", text.about);
  setTexts(".actions a", text.actions);

  setText("#skills .eyebrow", text.skillsEyebrow);
  setText("#skills-title", text.skillsTitle);
  setTexts(".skills-grid li", text.skills);

  setText("#projects .eyebrow", text.projectsEyebrow);
  setText("#projects-title", text.projectsTitle);
  setTexts(".project-number", text.projectNumbers);
  setTexts(".card h3", text.projectTitles);
  setTexts(".card p:not(.project-number)", text.projectDescriptions);

  document.querySelectorAll(".card a").forEach((link, index) => {
    link.textContent = text.repository;
    link.setAttribute("aria-label", text.repositoryLabels[index]);
  });

  setText("#hobbies .eyebrow", text.hobbiesEyebrow);
  setText("#hobbies-title", text.hobbiesTitle);
  setTexts(".hobbies-list li", text.hobbies);

  setText("#contact .eyebrow", text.contactEyebrow);
  setText("#contact-title", text.contactTitle);
  setText("#contact > p:not(.eyebrow)", text.contactDescription);
  setTexts(".form-field label", text.labels);
  setText("#contact-form button[type='submit']", text.submit);

  setText(".site-footer p", text.footer);
  setText(".site-footer a[target='_blank']", text.github);
  setText(".site-footer a[href='#about']", text.back);

  updateThemeButton();
  updatePhotoText();
  updateFormStatus();
}

themeButton.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
  updateThemeButton();
});

languageButton.addEventListener("click", () => {
  currentLanguage = currentLanguage === "en" ? "ar" : "en";
  applyLanguage();
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
  if (photoBusy) {
    return;
  }

  const nextPhoto = (currentPhoto + 1) % photos.length;

  photoBusy = true;
  photoFailed = false;
  photoButton.disabled = true;
  updatePhotoText();

  try {
    await loadPhoto(photos[nextPhoto]);

    profilePhoto.classList.add("is-changing");
    await waitForFade();

    profilePhoto.src = photos[nextPhoto];
    await profilePhoto.decode();

    currentPhoto = nextPhoto;
  } catch (error) {
    profilePhoto.src = photos[currentPhoto];
    photoFailed = true;
  } finally {
    profilePhoto.classList.remove("is-changing");
    photoBusy = false;
    photoButton.disabled = false;
    updatePhotoText();
  }
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.querySelector("#name").value.trim();
  const email = document.querySelector("#email").value.trim();
  const message = document.querySelector("#message").value.trim();

  if (!name || !email || !message) {
    formState = "formRequired";
    updateFormStatus();
    return;
  }

  const text = translations[currentLanguage];
  const recipient = contactForm.dataset.email;

  const subject = encodeURIComponent(
    `${text.emailSubject} ${name}`
  );

  const body = encodeURIComponent(
    `${text.emailName}: ${name}\n` +
    `${text.emailAddress}: ${email}\n\n${message}`
  );

  formState = "formOpening";
  updateFormStatus();

  window.location.href =
    `mailto:${recipient}?subject=${subject}&body=${body}`;
});

applyLanguage();