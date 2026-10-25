# SimpleBlog — Personal Publishing Platform

A responsive, browser-based blogging website built with **HTML, CSS, and vanilla JavaScript**. SimpleBlog lets users write, browse, search, edit, and delete articles, with posts stored locally in the browser.

<p align="center">
  <strong>Write Articles · Search & Filter · Edit Posts · Local Storage</strong>
</p>

## Overview

SimpleBlog provides a simple space to publish ideas, tutorials, coding notes, career advice, and personal stories. It includes a blog feed, article creation form, category filters, reading-time estimates, and modal views for reading and editing posts.

> **Storage note:** Posts are saved in the browser's `localStorage`. They are not synced to a server and are not automatically shared across browsers or devices.

## Features

- **Create posts** with a title, author name, category, and article content.
- **Browse articles** in a responsive blog feed.
- **Read full articles** in a dedicated modal.
- **Edit existing posts** using an edit modal.
- **Delete posts** with a confirmation prompt.
- **Search articles** by title or content.
- **Filter by category**, including Technology, Coding, Career, and Lifestyle.
- **Estimate reading time** based on article length.
- **Track the article count** displayed on the homepage.
- **Count words while writing** and show an estimated reading time.
- **Persist posts locally** with browser `localStorage`.
- **Responsive design** with a clean layout, sticky navigation, and visual interactions.

## Built With

| Technology | Purpose |
|---|---|
| HTML5 | Page structure and forms |
| CSS3 | Responsive layout, visual design, and modal styling |
| JavaScript (Vanilla) | Post management, filtering, search, and UI interactions |
| Browser `localStorage` | Local persistence for blog posts |
| Google Fonts (Inter) | Typography |

No frameworks, build tools, or package installation are required.

## Getting Started

### Option 1: Run locally

1. Clone the repository:

   ```bash
   git clone https://github.com/joshichaitanya58/Simple_Blog_Website.git
   ```

2. Move into the project folder:

   ```bash
   cd Simple_Blog_Website
   ```

3. Open `index.html` in your browser.

You can also open the folder in Visual Studio Code and run it using the **Live Server** extension.

### Option 2: Open the live demo

If GitHub Pages is enabled for this repository, visit:

**https://joshichaitanya58.github.io/Simple_Blog_Website/**

## How to Use

1. Open the homepage.
2. Click **Write Post** or **Start Writing**.
3. Enter the article title and content; author name is optional.
4. Choose a category and publish the article.
5. Search for posts using the search field or filter them by category.
6. Use **Read** to view an article, **Edit** to update it, or **Delete** to remove it.

A sample welcome article is added automatically the first time the app is opened with no existing `posts` entry in local storage.

## Project Structure

```text
Simple_Blog_Website/
├── index.html       # Blog homepage and article feed
├── new_post.html    # Create-article form
├── main.js          # Post CRUD, search, filters, and modal behavior
├── style.css        # Site styling and responsive layout
├── bg.jpg           # Hero-section background image
└── README.md        # Project documentation
```

## Data & Privacy

- Posts are stored in the current browser's local storage under the key `posts`.
- Clearing browser site data can remove saved posts.
- Posts are not stored in a database and do not sync across devices.
- This is a front-end demo; it does not provide user accounts, server-side publishing, or multi-user collaboration.

## Future Improvements

- Add a backend API and database for shared, persistent articles.
- Add user registration, login, and author profiles.
- Support Markdown or a rich-text editor.
- Add tags, pagination, and sorting by date.
- Add image uploads and article cover images.
- Add export/import or cloud backup for posts.
- Improve keyboard navigation and accessibility.

## Author

**Chaitanya Joshi**

- GitHub: [@joshichaitanya58](https://github.com/joshichaitanya58)
- Portfolio: [my-portfolio-delta-virid-82.vercel.app](https://my-portfolio-delta-virid-82.vercel.app/)
- LinkedIn: [Chaitanya Joshi](https://www.linkedin.com/in/chaitanya-joshi-644b39298/)

---

<p align="center">Built with HTML, CSS, and JavaScript.</p>
