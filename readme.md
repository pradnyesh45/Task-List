# Task List Application

A full-stack task management application built with Angular and Flask.

## 🚀 Live Demo

- Frontend: [https://cart-4cbdb.web.app/](https://cart-4cbdb.web.app/)
- Backend API: [https://task-list-production-5060.up.railway.app/](https://task-list-production-5060.up.railway.app/)

## 🛠️ Tech Stack

### Frontend

- Angular 17
- TypeScript
- HTML/CSS
- Firebase Hosting

### Backend

- Flask (Python)
- SQLAlchemy
- PostgreSQL
- Railway for hosting

## 🏗️ Project Structure

task-list/
├── frontend/ # Angular application
│ ├── src/ # Source files
│ ├── dist/ # Build output
│ └── package.json # Dependencies
└── backend/ # Flask API
├── app/ # Application code
├── requirements.txt # Python dependencies
└── run.py # Entry point

## 🚀 Getting Started

### Prerequisites

- Node.js and npm
- Python 3.x
- PostgreSQL

### Local Development

1. **Clone the repository**

```bash
git clone https://github.com/pradnyesh45/Task-List.git
cd Task-List
```

2. **Set up the Backend**

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python run.py
```

3. **Set up the Frontend**

```bash
cd frontend
npm install
ng serve
```

4. **Access the application**

- Frontend: http://localhost:4200
- Backend API: http://localhost:5000

## 📝 Features

- Create, Read, Update, and Delete tasks
- Responsive design
- RESTful API
- Cross-Origin Resource Sharing (CORS) enabled

## 🌐 API Endpoints

- GET `/tasks` - List all tasks
- POST `/tasks` - Create a new task
- PUT `/tasks/{id}` - Update a task
- DELETE `/tasks/{id}` - Delete a task

## 🚀 Deployment

- Frontend is deployed on Firebase Hosting
- Backend is deployed on Railway
- Database is hosted on Railway PostgreSQL

## 👤 Author

- Pradnyesh Aglawe
- GitHub: [@pradnyesh45](https://github.com/pradnyesh45)
