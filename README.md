# Notes App

A full-stack Notes App that allows users to create, view, update, and delete their personal notes. The application will include user authentication, a notes dashboard, and a rich text editor, with each user having access to their own notes.

This project is part of my **10P SHINE Cohort 10 Internship**.

## About the Project

The goal of this project is to build a full-stack web application where users can manage their notes in one place. Users will be able to create accounts, log in, and manage their notes through a simple interface.

While developing this application, I will also work on backend development, database integration, testing, logging, exception handling, and code quality.

## Tech Stack

- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** MySQL
- **Logging:** Pino
- **Backend Testing:** Mocha, Chai
- **Frontend Testing:** Jest
- **Code Quality:** SonarQube
- **Version Control:** Git and GitHub

## Features

### Authentication
- User registration and login
- Logout functionality
- Protected routes
- Authentication and authorization

### Notes
- Create new notes
- View saved notes
- Update existing notes
- Delete notes
- Rich text editor
- Notes associated with individual users

### Dashboard
- Display personal notes
- Access note creation and editing
- Manage notes from the dashboard

### User Profile
- View user information
- Logout

### Logging and Exception Handling
- Application logging using Pino
- Log important application events and errors
- HTTP request logging
- Centralized exception handling
- Proper error responses

### Testing and Code Quality
- Backend testing using Mocha and Chai
- Frontend testing using Jest
- Code quality analysis using SonarQube

## Project Structure

The project will be organized into separate frontend and backend folders.

```text
notes-app/
├── backend/
├── frontend/
├── README.md
└── .gitignore
```

The folder structure will be further organized as the project develops.

## Database

I will use MySQL to store user and note information.

### Users Table
- User ID
- Name
- Email
- Password hash
- Created date
- Updated date

### Notes Table
- Note ID
- User ID
- Title
- Content
- Created date
- Updated date

Each note will belong to a specific user so users can manage their own notes.

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login a user |

### Notes

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/notes` | Get personal notes |
| POST | `/api/notes` | Create a note |
| GET | `/api/notes/:id` | Get a specific note |
| PUT | `/api/notes/:id` | Update a note |
| DELETE | `/api/notes/:id` | Delete a note |

*These endpoints are planned and may be adjusted during implementation.*

## Git Workflow

I will follow the branching strategy provided in the internship guide.

- `main` – production-ready code
- `develop` – integration branch
- `feature/frontend/<feature-name>` – frontend features
- `feature/backend/<feature-name>` – backend features
- `bugfix/frontend/<bug-description>` – frontend fixes
- `bugfix/backend/<bug-description>` – backend fixes

Features and bug fixes will be developed on separate branches and submitted through Pull Requests for review.

## Development Plan

- [ ] Project setup
- [ ] Backend setup
- [ ] MySQL database integration
- [ ] User registration and login
- [ ] Authentication middleware
- [ ] Notes CRUD APIs
- [ ] Pino logging
- [ ] Exception handling
- [ ] React frontend setup
- [ ] Login and registration pages
- [ ] Notes dashboard
- [ ] Notes editor
- [ ] Rich text editor integration
- [ ] User profile and logout
- [ ] Backend tests
- [ ] Frontend tests
- [ ] SonarQube integration
- [ ] Application testing
- [ ] Final documentation

## Internship Information

- **Program:** 10P SHINE
- **Cohort:** 10
- **Domain:** MERN (Node.js + React.js)
- **Assignment:** Notes App


