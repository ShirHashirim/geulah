# Geulah - Redemption and Connection to God

A multi-language website about Geulah (redemption) and connecting to God, built with HTML and CSS.

## Website Structure

The website is organized into four language sections:

- English (en/)
- Hebrew (he/) with RTL support
- French (fr/)
- Russian (ru/)

Each language section contains seven pages:
- Home page (index.html)
- What is Geulah? (what-is-geulah.html)
- Personal Redemption (personal-redemption.html)
- Connecting to God (connecting-to-god.html)
- Three Ways to Find Geulah (three-ways-to-find-geulah.html)
- Return from Exile (return-from-exile.html)
- First Fruits (first-fruits.html)

## Features

- Modern, responsive design that works on all device sizes
- Language switcher on each page for easy navigation between languages
- Consistent navigation and structure across all languages
- Proper RTL (right-to-left) support for Hebrew content
- Beautiful imagery from Unsplash (copyright-free)

## Hosting with GitHub Pages

This repository is set up to automatically deploy to GitHub Pages using GitHub Actions. Here's how it works:

1. The GitHub Action workflow (`.github/workflows/deploy.yml`) is triggered whenever changes are pushed to the `main` branch.
2. The workflow builds and deploys the static site to GitHub Pages.
3. The site is then accessible at `https://shirhashirim.github.io/geulah/`

### Setting Up GitHub Pages

To enable GitHub Pages for this repository:

1. Go to the repository settings on GitHub.
2. Navigate to the "Pages" section.
3. Under "Source", select "GitHub Actions" as the deployment source.
4. The site will be automatically deployed when you push changes to the main branch.

## Local Development

To work on this site locally:

1. Clone the repository:
   ```
   git clone https://github.com/ShirHashirim/geulah.git
   ```

2. Open the project in your favorite code editor.

3. Make your changes to the HTML and CSS files.

4. Test your changes by opening the HTML files in a web browser.

5. Commit and push your changes to GitHub to trigger the automatic deployment:
   ```
   git add .
   git commit -m "Your commit message"
   git push
   ```

## License

The content and code in this repository are available under an open license. Images are from Unsplash and are free to use under their license.