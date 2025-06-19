# Tri-Chandra Research Group Website

This is the official website for Tri-Chandra Research Group (TCRG), a research organization based at Tri-Chandra Multiple Campus, Kathmandu, Nepal.

## Overview

The website is built using vanilla HTML, CSS, and JavaScript without any frameworks to ensure maximum compatibility and ease of maintenance. It features a responsive design that works well on all device sizes from mobile phones to large desktop screens.

## Pages

The website consists of the following pages:

- **Home (index.html)** - Main landing page with overview of TCRG
- **About (about.html)** - Information about TCRG, history, mission, vision, and objectives
- **Research (research.html)** - Details about research areas, projects, and sub-groups
- **Team (team.html)** - Information about the executive committee, faculty, researchers, and students
- **Publications (publications.html)** - List of research papers and publications by TCRG members
- **Events (events.html)** - Information about upcoming and past events, workshops, and seminars
- **Contact** - Located in the footer of each page and as a section in the homepage

## Features

- Fully responsive design using CSS flexbox and grid
- Mobile-first approach with a collapsible navigation menu
- Interactive elements including:
  - Research area accordions
  - Event sliders
  - Publication filters
  - Team member filters
  - Animated counters
  - Contact form with validation
  - Scroll-to-top button
  - Sticky header
  - Scroll spy for navigation
- SEO optimized with proper meta tags and semantic HTML
- Accessibility features including ARIA attributes and keyboard navigation
- Optimized images and assets for faster loading

## File Structure

```
/
├── index.html           # Home page
├── about.html           # About page
├── research.html        # Research page
├── team.html            # Team page
├── publications.html    # Publications page
├── events.html          # Events page
├── assets/
│   ├── images/          # All website images
│   └── documents/       # PDFs, presentations, etc.
├── css/
│   └── style.css        # Main stylesheet
├── js/
│   └── script.js        # Main JavaScript file
└── README.md            # This file
```

## Getting Started

To view the website locally:

1. Clone this repository:
   ```
   git clone https://github.com/tcresearchgroup/tcresearchgroup.github.io.git
   ```

2. Open the index.html file in your web browser:
   ```
   cd tcresearchgroup.github.io
   # Open index.html in your browser
   ```

Alternatively, you can use a local development server:

```bash
# Using Python 3
python -m http.server

# Using Node.js (after installing http-server)
npx http-server
```

Then visit `http://localhost:8000` in your browser.

## Deployment

This site is deployed via GitHub Pages and automatically updates when changes are pushed to the main branch.

## Contributing

If you want to contribute to this website, please:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some feature'`)
5. Push to the branch (`git push origin feature/your-feature`)
6. Open a Pull Request

## License

This website is the property of Tri-Chandra Research Group. All rights reserved.