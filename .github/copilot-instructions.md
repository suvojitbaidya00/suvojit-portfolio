# Copilot Instructions for AI Agents

## Project Overview
This is a static portfolio website for Suvojit Baidya, built with vanilla HTML, CSS, and JavaScript. It is designed as a single-page application with multiple HTML files for different sections (Home, Research, Skills, Experience, Contact). There is no build process, backend, or external dependencies beyond CDN links for Font Awesome icons.

## Key Files & Structure
- `index.html`: Main landing page; entry point for the portfolio.
- `research.html`, `skills.html`, `experience.html`, `contact.html`: Section pages, each with a consistent navigation bar and footer.
- `styles.css`: Global styles, CSS variables for theming, responsive design, and dark mode support.
- `script.js`: Handles navigation menu toggling, dark mode, scroll animations, carousel, and contact form simulation.

## Patterns & Conventions
- **Navigation**: All pages use the same `<nav>` structure. The active page is highlighted with the `active` class.
- **Dark Mode**: Toggled via the `#theme-toggle` button. Theme preference is stored in `localStorage` and applied via the `data-theme` attribute on `<html>`.
- **Animations**: Elements with the `hidden` class are revealed on scroll using Intersection Observer in `script.js`.
- **Cards & Grids**: Content is organized using `.card` and `.card-grid` classes for a consistent look.
- **Carousel**: Used in research and experience sections for image slides. Controlled by `.carousel-btn` elements.
- **Contact Form**: The form in `contact.html` is a demo only; submission triggers an alert and reset, with no backend integration.
- **Citations**: Some content is marked with `[cite_start]... [cite: N]` for academic referencing. These are static and not programmatically processed.

## Developer Workflows
- **No build step**: All files are static. Open `index.html` or any section file directly in a browser to view.
- **No tests or CI/CD**: There are no automated tests or build scripts.
- **Debugging**: Use browser DevTools for inspecting layout, styles, and JavaScript behavior.
- **Adding Sections**: To add a new section, duplicate an existing HTML file, update navigation links, and add content. Ensure to link `styles.css` and `script.js`.
- **Styling**: Use CSS variables for color and theme consistency. Responsive design is handled via media queries in `styles.css`.

## External Integrations
- **Font Awesome**: Icons are loaded via CDN in each HTML file.
- **No other external dependencies**: All logic and styles are local except for icons.

## Examples
- To add a new skill, edit `skills.html` and use the `.card` structure.
- To update the theme, modify CSS variables in `styles.css` under `:root` and `[data-theme="dark"]`.
- To add a new navigation item, update the `<nav>` in all HTML files and adjust the `active` class as needed.

## Important Notes
- Keep all section pages (`*.html`) consistent in navigation and footer.
- Do not add backend logic or frameworks; this is a static site.
- Maintain accessibility and responsive design as in the current implementation.

---
For more, see the code comments in `script.js` and the CSS structure in `styles.css`.
