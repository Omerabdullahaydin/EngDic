# English-Turkish Dictionary Backend API

This project is a RESTful API for an English-Turkish dictionary, built following modern backend architecture patterns and software engineering best practices. It runs on a Node.js/Express environment backed by a PostgreSQL database isolated inside a Docker container, designed from the ground up to handle large datasets and future Artificial Intelligence (AI) integrations.

## 🚀 Key Features & Architecture

* **Dockerized PostgreSQL:** Database installation issues (such as local encoding or permission conflicts on Windows) are completely bypassed by isolating the PostgreSQL service inside a Docker container.
* **Separation of Config from Code:** Adhering to security standards, all sensitive credentials, ports, and database keys are securely managed via a central `.env` file that is kept out of source control.
* **Automated Database Seeding:** Upon startup, the application automatically verifies the database schema, creates the necessary tables if they don't exist, and injects initial sample data to ensure the API is immediately testable.
* **Scalable Data Strategy:** The database schema and models are strategically structured to handle upcoming bulk imports of thousands of words via external APIs and automated LLM context generation.

---

## 🛠️ Tech Stack & Tools

* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** PostgreSQL (Docker Container)
* **Driver:** Node-Postgres (`pg` Connection Pool)
* **Process Management:** Nodemon (Development Mode)

---

## 📂 Project Structure

```text
├── src/
│   ├── config/
│   │   └── db.js          # PostgreSQL Pool configuration
│   ├── controllers/
│   │   └── wordController.js # API business logic & SQL queries
│   ├── models/
│   │   └── wordModel.js   # Database schema & automated seeder
│   ├── routes/
│   │   └── wordRoutes.js  # URL routing definitions
│   └── app.js             # Main application entry point
├── .env                   # Environment variables (kept local)
├── package.json           # Project dependencies & npm scripts
└── README.md