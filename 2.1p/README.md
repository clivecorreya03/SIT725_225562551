# SIT725 Task 2.2P – Express Web Server

## Student Information

- **Name:** Clive Correya
- **Unit:** SIT725 – Applied Software Engineering
- **Task:** 2.2P – Express Web Servers

---

## Project Description

This project demonstrates the use of **Node.js** and **Express.js** to create a simple web server. The application serves a static HTML webpage and provides REST API endpoints.

The application includes:

- A static webpage served from the `public` folder.
- A REST API that returns a random motivational quote.
- A REST API that adds two numbers supplied as query parameters.
- A POST endpoint to add new quotes to the server.

---

## Technologies Used

- Node.js
- Express.js
- HTML
- JavaScript
- REST API

---

## Project Structure

```
SIT725_225562551/
│
├── public/
│   └── index.html
│
├── server.js
├── package.json
├── package-lock.json
├── README.md
└── node_modules/
```

---

## Installation

Clone the repository:

```bash
git clone https://github.com/clivecorreya03/SIT725_225562551.git
```

Navigate to the project directory:

```bash
cd SIT725_225562551
```

Install dependencies:

```bash
npm install
```

---

## Running the Application

Start the server:

```bash
npm start
```

or

```bash
npm run dev
```

The application will run on:

```
http://localhost:3000
```

---

## API Endpoints

### Home Page

```
GET /
```

Displays the web application.

---

### Random Quote API

```
GET /api/quote
```

Example Response:

```json
{
  "quote": "Life is 10% what happens to us and 90% how we react to it."
}
```

---

### Add Two Numbers

```
GET /add?num1=10&num2=20
```

Example Response:

```json
{
  "operation": "Addition",
  "num1": 10,
  "num2": 20,
  "result": 30
}
```

---

### Add a New Quote

```
POST /api/quote
```

Request Body:

```json
{
  "quote": "Practice makes perfect."
}
```

Example Response:

```json
{
  "message": "Quote added successfully!",
  "quote": "Practice makes perfect."
}
```

---

## Features

- Express Web Server
- Static File Hosting
- REST API using GET
- REST API using POST
- Random Quote Generator
- Addition Calculator
- JSON Responses
- Error Handling

---

## Screenshots

Include screenshots of:

- Home page
- Random Quote API working
- Addition API working
- Terminal showing the server running

---

## Repository

GitHub Repository:

https://github.com/clivecorreya03/SIT725_225562551

---

## License

This project is licensed under the MIT License.

---

## Author

**Clive Correya**

SIT725 – Applied Software Engineering

Deakin University