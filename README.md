# Globetrotter Challenge – The Ultimate Travel Guessing Game

🧩 **The Globetrotter Challenge** is a full-stack travel guessing game where users receive cryptic clues about a famous destination and must choose the correct answer from multiple options. When they answer, they unlock fun facts, trivia, and surprises about the destination—all while tracking their score and challenging friends!

---

## Project Overview

Globetrotter challenges players to guess the destination based on 1–2 random clues. After answering, the app provides immediate feedback with funky animations:
- **Correct Answer:** Confetti animation + fun fact reveal.
- **Incorrect Answer:** Sad-face animation + fun fact reveal.

Additional features include:
- A dynamic “Challenge a Friend” option that registers users, generates an invite link with a dynamic image (for WhatsApp sharing), and displays the invitee’s score before play.
- A backend-stored dataset (expanded to 100+ destinations with AI tools) that includes clues, fun facts, and trivia to keep the answers secure from client-side exposure.

---

## Tech Stack

- **Frontend:**  
  - React  
  - Material UI  
  - Axios

- **Backend:**  
  - Node.js  
  - Express

- **Database:**  
  - [Your chosen database, e.g., MongoDB or PostgreSQL]  
  *(The dataset is stored on the backend to prevent users from accessing it via source code.)*

- **AI Integration:**  
  - Utilized AI tools (ChatGPT, OpenAI API, web scraping) to expand the starter dataset to 100+ destinations.

- **Deployment:**  
  - Frontend deployed on [Vercel/Netlify]  
  - Backend deployed on [Railway/Heroku]

---

## Setup & Installation

### Prerequisites
- Node.js (>=14.x)
- npm or yarn

### Clone the Repository
```bash
git clone https://github.com/yourusername/globetrotter-challenge.git
cd globetrotter-challenge
