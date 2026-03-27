<h1 align="center">PocketDoc</h1>

<p align="center">
  Hello ! Welcome to my solo project PocketDoc. The goal of this project was to access to natural remedies depending on the symptom you are experiencing. The content of the app is purely informational.  
</p>

<p align="center">
  <a href="#demo">Demo</a> ·
  <a href="#features">Features</a> ·
  <a href="#tech-stack">Tech Stack</a> ·
  <a href="#getting-started">Getting Started</a>
</p>

## Demo

**Demo video:** [_YouTube Link_](https://youtu.be/FeUjl7nKqAk)

### Screenshot

![snapshot](./pocket_Doc/public/assets/PocketDoc-Project.png)

## Features

- **Navigation:** The home page propose a path for each symptoms. 
- **Specific content:** The content is specific for each symptoms and is adapting depeding on which one you click. 
- **Ingredient List:** The list is made as a checkbox that can be imported as a pdf. 
- **Youtube video:** You can access and play a youtube video directly on the website. 

## Tech Stack

### Frontend

- **React** (UI)
- **Vite** (dev server & build)
- **Json Server** (Fake API in React)
- **React Router** (Managing routing)
- **Pdf Package** (PDF generation)
- **Youtube Package** (Embedding YouTube video)


## Getting Started

### Prerequisites

This project currently runs **locally only** 
To run it on your machine, you’ll need:

- **Node.js**
- **npm** 
- **Web Browser** 

### Installation

Clone the repository, then install dependencies for both the client and server.

```bash
git clone <YOUR_REPO_URL>
cd <YOUR_REPO_NAME>
```

#### Install server dependencies

```bash
npm install -g json-server
```

#### Install dependencies

```bash
cd ../pocket_Doc
npm install
```
```bash
cd ../pocket_Doc
npm install react-router-dom react-youtube jspdf jspdf-autotable
```

### Run Locally

#### 1) Start the backend

From the project root: Start the json server in two different terminal

```bash
Terminal 1 : npx json-server --watch ingredients.json --port 3000
Terminal 2 : npx json-server --watch db.json --port 3030
```

#### 2) Start the frontend

Open a new terminal, then from the project root:

```bash
cd pocket_Doc
npm run dev
```

#### Local URLs

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3000/ingredients`
- Backend: `http://localhost:3030/symptoms`


## Remaining Tasks

- [ ] **Increase the database:** Add additional informations to each database to have more complete infoirmational app.
- [ ] **Ingredients List:** Improve the importation as table so the display is more modern.
- [ ] **Router:**  Improve the button navigation so that it increase depending on the database and i don't have to recreate a button. 
- [ ] **Youtube:** Improve the importation on the DOM window. 

