# React + TypeScript + Vite

<img width="1797" height="798" alt="image" src="https://github.com/user-attachments/assets/f80414a1-e2f9-4560-8bf3-0bd037d20c9b" /><br>




🚀 Features
📌 Add, Edit & Delete Columns and Tasks

📝 Detailed Task View with editable title, description, due date, status, and comments

💾 LocalStorage Integration for persistent data across sessions

🧲 Drag & Drop Support powered by @dnd-kit for reordering columns and moving tasks

🔍 Responsive Design for desktop, tablet, and mobile

💬 Comments Section inside each task

🧪 Built using TypeScript for type safety and scalability

    🛠️ Tech Stack
    React
    
    TypeScript
    
    Tailwind CSS
    
    @dnd-kit
    
    React Router
    
    localStorage (for persistence)

    
📦 Getting Started
    # Clone the repo
    git clone https://github.com/esraemad/kanban-board.git
    
    # Install dependencies
    npm install
    
    # Run the app
    npm run dev

📁 Project Structure

    src/
    ├── components/         # Reusable components like TaskCard, ColumnContainer, Modal
    ├── utils/              # Utility functions for localStorage and task/column logic
    ├── types/              # TypeScript types
    ├── icons/              # SVG icon components
    ├── pages/              # Routing and detail views
    └── App.tsx             # Main app layout

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
