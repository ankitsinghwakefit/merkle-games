# 🎮 Nuxt Games Explorer

A responsive web app built with **Nuxt 3 + TypeScript** to explore games using a REST API. The focus is on clean architecture, performance, and accessibility.

---

## 🚀 Tech Stack

* Nuxt 3
* TypeScript
* SCSS (no UI libraries)
* Vitest (basic testing)

---

## 📌 Features

### Index Page

* Displays **15 random games (2015–2017)**
* Responsive **multi-column flexbox layout**
* Game card shows image, title, release date, rating, and genre
* **Search (debounced)**
* **Filter by genre**
* **Sorting** (rating / release date)

### Detail Page

* Full game details:

  * Title, description, image
  * Release date, rating, developer, genre
* **Reviews list** (user, rating, text)
* Back navigation + smooth transitions

---

## ⚙️ Key Decisions

* **Two-step API calls:** fetch IDs → fetch full details
* Used `Promise.all` for parallel requests
* **Composables over Pinia** (lightweight state handling)
* Separated **API models vs UI models**

---

## 🧪 Run Locally

```bash
# Start API
docker-compose up

# Start client
cd client
npm install
npm run dev
```

App: http://localhost:3000
API Docs: http://localhost:8000/api-docs

---

## ⏱️ Time Spent

~ 5 - 6 hours

---

## 📎 Repository

(https://github.com/ankitsinghwakefit/merkle-games/tree/master/client/merkle-games-frontend)
