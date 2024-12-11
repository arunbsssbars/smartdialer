# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


## Standered Folder Structure of the project

project-root/
### Backend
├── backend/                 # Node.js backend folder
│   ├── controllers/         # Business logic
│   ├── models/              # Database schemas/models
│   ├── routes/              # API route definitions
│   ├── middlewares/         # Middleware for handling requests
│   ├── config/              # Configuration files (e.g., db connection)
│   ├── utils/               # Utility functions
│   ├── server.js            # Main entry point for the backend
│   └── package.json         # Backend dependencies and scripts
├── frontend/                # React 
### Frontend
│   ├── public/              # Static files (e.g., index.html, favicon)
│   ├── src/                 # Source code for React app
│   │   ├── assets/          # Images, fonts, and static assets
│   │   ├── components/      # Reusable React components
│   │   ├── pages/           # React pages (mapped to routes)
│   │   ├── styles/          # Global and modular styles
│   │   ├── utils/           # Utility functions
│   │   ├── App.js           # Main App component
│   │   ├── index.js         # Entry point for React app
│   └── package.json         # Frontend dependencies and scripts
├── .gitignore               # Files and folders to ignore in Git
├── README.md                # Project overview and setup instructions
├── package.json             # Root dependencies (optional: workspaces or scripts)
└── .env                     # Environment variables
