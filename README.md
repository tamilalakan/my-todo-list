## Todo App (Vite + React)

Simple Todo application built with React 18 and Vite 5.

### Prerequisites
- **Node.js** 18+ and **npm**

### Getting Started
1. Install dependencies:
```bash
npm install
```
2. Start the dev server:
```bash
npm run dev
```
Vite will print a local URL (typically `http://localhost:5173`).

### Scripts
- **dev**: start the local development server
```bash
npm run dev
```
- **build**: create a production build in `dist/`
```bash
npm run build
```
- **preview**: preview the production build locally
```bash
npm run preview
```
- **deploy**: publish `dist/` to GitHub Pages (requires repo setup and permissions)
```bash
npm run deploy
```

### Project Structure
```
todo-app/
  ├─ index.html
  ├─ package.json
  ├─ vite.config.js
  └─ src/
      ├─ main.jsx
      ├─ TodoApp.jsx
      └─ index.css
```

### Deployment (GitHub Pages)
This project includes a `deploy` script using `gh-pages`.
1. Ensure the project is committed to a GitHub repository.
2. Set the repository's "Pages" source to `gh-pages` branch.
3. Run:
```bash
npm run deploy
```

### Notes
- This app uses React 18 with `@vitejs/plugin-react`.
- Update `TodoApp.jsx` to customize features and UI.


