# TaskFlow — Demo Application

A simple task management API used to demonstrate DevFlow agents in action.

This app intentionally contains issues that DevFlow agents can detect and fix:
- A failing CI/CD pipeline (missing test dependency)
- Security vulnerabilities (SQL injection, hardcoded secrets)
- Missing documentation
- Untriaged issues

## Stack
- Python 3.11+ / Flask
- SQLite database
- pytest for testing

## Setup
```bash
pip install -r requirements.txt
python app.py
```

## API Endpoints
- `GET /tasks` — List all tasks
- `POST /tasks` — Create a task
- `GET /tasks/:id` — Get a task
- `PUT /tasks/:id` — Update a task
- `DELETE /tasks/:id` — Delete a task
