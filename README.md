# Customer Management Dashboard

A simple **full-stack web application** built using **React JS, Node JS, and Express JS** to manage customer records.

This application allows users to **add, view, search, sort, paginate, and delete customers** using a clean and responsive UI.

---

## Objective

Build a basic full-stack web application that allows users to:

- Add new customers using a form
- View customers in a table
- Search customer details
- Delete customer records
- Sort by customer name
- Paginate records
- Prevent duplicate entries
- Store data in backend in-memory array

---

## Tech Stack

### Frontend
- React JS
- Axios
- CSS

### Backend
- Node JS
- Express JS
- CORS
- UUID

---

## Features

### Frontend Features
- Responsive UI for desktop, tablet, and mobile
- Navbar with application title
- Customer form with:
  - Name
  - Email
  - Phone Number
  - Submit button
- Input validation:
  - All fields required
  - Email format validation
  - Phone number only numeric
  - Maximum 10 digits
- Search box for:
  - Name
  - Email
  - Phone
- Sorting by clicking **Name** column
- Pagination with rows dropdown
- Alternating row colors for readability
- Delete button in red
- Success and error popup messages

### Backend Features
- Add customer API
- Get all customers API
- Delete customer API
- Duplicate validation check
- In-memory array storage
- Unique ID generation using UUID

---

## API Endpoints

### Add Customer
```http
POST customers
```

### Get All Customers
```http
GET customers
```

### Delete Customer
```http
DELETE customers/:id
```

---

## Project Structure

```text
customer-management-dashboard/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── CustomerForm.jsx
│   │   │   └── CustomerTable.jsx
│   │   │
│   │   ├── App.js
│   │   └── App.css
│   │
│   └── package.json
│
├── backend/
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## Setup Instructions

### Backend Setup
```bash
cd backend
npm install
node server.js
```

Backend runs on:

```text
http://localhost:5000
```
---

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

Frontend runs on:

```text
http://localhost:3000
```
---

## Application Flow

```text
Frontend (React)
       ⇅
Backend (Node + Express)
       ⇅
In-Memory Array Storage
```

### Flow Steps
1. User enters Name, Email, Phone
2. Clicks Submit
3. React sends `POST customers`
4. Backend stores data in array
5. React fetches updated list using `GET customers`
6. Table re-renders
7. Delete sends `DELETE customers/:id`
8. Table refreshes automatically

---

## Important Note

Customer data is stored in an **in-memory array**.

This means:

- Data is available only while backend server is running
- Data will reset after restarting the backend server

This is expected as per assignment requirement.

---

## Assignment Conditions Covered

- Full-stack web application
- React frontend
- Node + Express backend
- In-memory array storage
- Add customer
- View customer
- Delete customer
- Search
- Sorting
- Pagination
- Form validation
- Duplicate prevention
- Responsive design
- Professional UI styling

---
