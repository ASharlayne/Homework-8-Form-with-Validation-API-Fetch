# Contact Form

A responsive contact form with client-side validation and an optional advice API request.

## Live site

https://asharlayne.github.io/Homework-8-Form-with-Validation-API-Fetch/

## Features

- Validates the name, email, age, and message fields.
- Displays accessible inline validation errors.
- Shows a success message immediately after valid submission.
- Fetches optional advice from the Advice Slip API.
- Keeps form submission successful if the advice API is unavailable.
- Deploys automatically to GitHub Pages through GitHub Actions.

## Project structure

- `index.html` - Form markup and page entry point.
- `styles.css` - Page styling and responsive layout.
- `script.js` - Validation, submission, and API behavior.
- `.github/workflows/pages.yml` - GitHub Pages deployment workflow.

## Run locally

Open `index.html` directly in a browser, or serve the project with a local static server:

```bash
python -m http.server
```

Then visit `http://localhost:8000`.

## API

The form uses the public [Advice Slip API](https://api.adviceslip.com/) without an API key. If the request fails, the form still displays the successful submission message and explains that the advice service is unavailable.
