# Vendor Management & Quotation System

A full-stack web application for managing vendors, creating quotation requests, receiving quotations, and comparing vendor proposals.

## Features

### Vendor Management
- Add, view, update, and delete vendors
- Search and filter vendors
- View vendor details with associated quotations

### Quotation Management
- Create quotation requests
- Assign quotations to vendors
- Update quotation status (pending, received, reviewed, approved, rejected)
- View quotation history

### Dashboard
- Total vendors count
- Active quotations count
- Pending quotations count
- Approved quotations count
- Recent activities log
- Quotation status distribution chart

### Quotation Comparison
- Compare quotations from different vendors
- Display quotation summaries
- Highlight the most cost-effective quotation
- Track quotation status

### Bonus Features
- Authentication and Authorization (JWT)
- Dark Mode
- Activity Logs
- Advanced Filtering and Search

## Tech Stack

### Backend
- Node.js & Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing

### Frontend
- React.js
- Tailwind CSS for styling
- React Router for navigation
- React Hot Toast for notifications
- Recharts for charts
- Axios for API calls

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend