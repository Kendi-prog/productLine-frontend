# ProductLine Frontend
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3-6DB33F?logo=springboot&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-Database-4479A1?logo=mysql&logoColor=white)
![Vercel](https://img.shields.io/badge/Frontend-Vercel-black?logo=vercel)
![Railway](https://img.shields.io/badge/Backend-Railway-0B0D0E)


A modern React and TypeScript frontend for the **Classic Models** management system. The application provides an intuitive interface for managing business data such as customers, products, employees, offices, orders, and payments through a Spring Boot REST API.

The frontend is built with reusable components, client-side routing, efficient server-state management, and responsive layouts to deliver a clean and scalable user experience.

---

## 🌐 Live Demo

**Frontend:** https://YOUR-VERCEL-URL.vercel.app

**Backend API:** https://productline-backend-production.up.railway.app/api

---

## ✨ Features

- Dashboard homepage
- Customer management
- Product management
- Employee management
- Office management
- Order management
- Payment management
- Search functionality
- Reusable data tables
- Modal-based forms
- Pagination
- Automatic date formatting
- Currency formatting
- Toast notifications
- Responsive dashboard layout

---

## 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| React 19 | User Interface |
| TypeScript | Type safety |
| Vite | Development and build tool |
| React Router | Client-side routing |
| TanStack React Query | Server state management and data fetching |
| Axios | HTTP client |
| Tailwind CSS | Styling |
| React Hot Toast | Notifications |
| React Icons | Icon library |
| clsx | Conditional class names |

---

## 📁 Project Structure

```
src/
├── api/              # API functions grouped by resource
├── assets/           # Static assets
├── components/       # Reusable UI components
├── layouts/          # Shared application layouts
├── pages/            # Feature pages
├── router/           # Route definitions
├── services/         # Axios configuration
├── App.jsx
├── main.jsx
└── index.css
```

---

## 📄 Application Pages

- Home Dashboard
- Customers
- Products
- Orders
- Payments
- Employees
- Offices

All pages are rendered within a shared dashboard layout using React Router.

---

## 🧩 Reusable Components

The project follows a component-based architecture with reusable UI components including:

- Table
- Button
- Modal
- SearchBar
- Card
- FlipCard
- PageHeader
- Icons

These components are shared across multiple pages to improve maintainability and consistency.

---

## 🔗 Backend Integration

The frontend communicates with a Spring Boot REST API using Axios.

Data fetching and caching are handled using **TanStack React Query**, providing:

- Automatic caching
- Background refetching
- Simplified asynchronous state management
- Improved performance

---

## 🚀 Running Locally

### Clone the repository

```bash
git clone <repository-url>
cd productline-frontend
```

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

The application will be available at:

```
http://localhost:5173
```

---

## 📸 Screenshots

## 📸 Screenshots

<p align="center">
  <img src="screenshots/dashboard.png" alt="Dashboard" width="48%">
  <img src="screenshots/orders.png" alt="Orders" width="48%">
</p>

<p align="center">
  <img src="screenshots/office.png" alt="Office" width="48%">
  <img src="screenshots/details.png" alt="Customer Details" width="48%">
</p>

<p align="center">
  <img src="screenshots/search.png" alt="Search Functionality" width="48%">
  <img src="screenshots/adding.png" alt="Adding Entities" width="48%">
</p>

---

## 🔮 Future Improvements

Potential enhancements include:

- User authentication and authorization
- Dashboard analytics
- Advanced filtering and sorting
- Export to Excel/PDF
- Dark mode
- Responsive mobile optimization

---

## 👨‍💻 Author

**Joy Leila Kendi**

GitHub: https://github.com/Kendi-prog
