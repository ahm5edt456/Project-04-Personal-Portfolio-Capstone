# Personal Portfolio — Exercise 00

A responsive personal portfolio built from scratch using HTML5,
CSS3, and JavaScript ES6+, without frameworks or UI libraries.

## Author

Ahmed Alshoubaki

## Sections

- Header and navigation
- About Me with a profile photo
- Skills grid
- Showcase of Projects 00–03
- Hobbies
- Contact form
- Footer

## Run locally

Open index.html in a web browser.

Alternatively, run the following command inside ex00:

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Theme switcher

1. The user clicks the theme button.
2. The browser fires a click event.
3. The callback registered with addEventListener executes.
4. classList.toggle adds or removes dark-theme on the body.
5. CSS variables change the page colors.
6. JavaScript updates the button text and aria-pressed attribute.

## Responsive layout

Flexbox arranges the navigation, skills, projects, and About section.
A media query adapts the layout for screens up to 760px wide.

## Contact form

HTML validates required fields and the email format.
JavaScript prevents the default form submission and prepares a
mailto link using encoded form values.

Sending requires a configured email application and user confirmation.
No backend is included.

## Personalization before submission

- Add assets/profile.jpg with your actual photo.
- Replace the contact email in index.html.
- Replace project links with actual repository URLs.
- Verify all project descriptions, skills, and hobbies are accurate.

## Technologies

HTML5, CSS3, JavaScript ES6+, Git.