"""TaskFlow — Task management API for DevFlow demo.

This application contains INTENTIONAL vulnerabilities and issues
for DevFlow agents to detect, fix, and document.

Issues included:
- SQL injection vulnerability (for Sentinel to fix)
- Hardcoded secret key (for security scan detection)
- Missing input validation (for Reviewer to catch)
- Missing error handling (for Reviewer to flag)
- Inconsistent patterns (for Reviewer to note)
- Missing documentation (for Scribe to generate)
"""

import sqlite3
import os
import hashlib
from datetime import datetime
from flask import Flask, request, jsonify

app = Flask(__name__)

# INTENTIONAL VULNERABILITY: Hardcoded secret (for security scan to detect)
SECRET_KEY = "super_secret_key_12345"
DATABASE = "tasks.db"

# INTENTIONAL: Debug mode left on
DEBUG_MODE = True


def get_db():
    """Get database connection."""
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    """Initialize the database."""
    conn = get_db()
    conn.execute("""
        CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT,
            status TEXT DEFAULT 'pending',
            priority TEXT DEFAULT 'medium',
            assignee TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)
    conn.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            email TEXT,
            password_hash TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)
    conn.commit()
    conn.close()


@app.route("/health", methods=["GET"])
def health_check():
    """Health check endpoint."""
    return jsonify({"status": "ok", "timestamp": datetime.now().isoformat()})


@app.route("/tasks", methods=["GET"])
def list_tasks():
    """List all tasks with optional filtering."""
    status_filter = request.args.get("status")
    priority_filter = request.args.get("priority")
    
    conn = get_db()
    query = "SELECT * FROM tasks"
    conditions = []
    params = []
    
    if status_filter:
        conditions.append("status = ?")
        params.append(status_filter)
    if priority_filter:
        conditions.append("priority = ?")
        params.append(priority_filter)
    
    if conditions:
        query += " WHERE " + " AND ".join(conditions)
    
    query += " ORDER BY created_at DESC"
    tasks = conn.execute(query, params).fetchall()
    conn.close()
    return jsonify([dict(t) for t in tasks])


@app.route("/tasks", methods=["POST"])
def create_task():
    """Create a new task."""
    data = request.get_json()
    if not data or not data.get("title"):
        return jsonify({"error": "Title is required"}), 400

    conn = get_db()
    # INTENTIONAL VULNERABILITY: SQL injection via f-string
    query = f"INSERT INTO tasks (title, description, status, priority, assignee) VALUES ('{data['title']}', '{data.get('description', '')}', '{data.get('status', 'pending')}', '{data.get('priority', 'medium')}', '{data.get('assignee', '')}')"
    conn.execute(query)
    conn.commit()
    conn.close()

    return jsonify({"message": "Task created"}), 201


@app.route("/tasks/<int:task_id>", methods=["GET"])
def get_task(task_id):
    """Get a single task."""
    conn = get_db()
    task = conn.execute("SELECT * FROM tasks WHERE id = ?", (task_id,)).fetchone()
    conn.close()

    if not task:
        return jsonify({"error": "Task not found"}), 404

    return jsonify(dict(task))


@app.route("/tasks/<int:task_id>", methods=["PUT"])
def update_task(task_id):
    """Update a task."""
    data = request.get_json()
    conn = get_db()

    # INTENTIONAL: No input validation for status/priority values
    task = conn.execute("SELECT * FROM tasks WHERE id = ?", (task_id,)).fetchone()
    if not task:
        conn.close()
        return jsonify({"error": "Task not found"}), 404

    # INTENTIONAL: Missing error handling for invalid data types
    conn.execute(
        "UPDATE tasks SET title=?, description=?, status=?, priority=?, assignee=?, updated_at=? WHERE id=?",
        (
            data.get("title", task["title"]),
            data.get("description", task["description"]),
            data.get("status", task["status"]),
            data.get("priority", task["priority"]),
            data.get("assignee", task["assignee"]),
            datetime.now().isoformat(),
            task_id,
        ),
    )
    conn.commit()
    conn.close()

    return jsonify({"message": "Task updated"})


@app.route("/tasks/<int:task_id>", methods=["DELETE"])
def delete_task(task_id):
    """Delete a task."""
    conn = get_db()
    result = conn.execute("DELETE FROM tasks WHERE id = ?", (task_id,))
    conn.commit()
    conn.close()

    if result.rowcount == 0:
        return jsonify({"error": "Task not found"}), 404

    return jsonify({"message": "Task deleted"})


@app.route("/tasks/search", methods=["GET"])
def search_tasks():
    """Search tasks by title or description."""
    query = request.args.get("q", "")
    
    # INTENTIONAL VULNERABILITY: SQL injection in search
    conn = get_db()
    sql = f"SELECT * FROM tasks WHERE title LIKE '%{query}%' OR description LIKE '%{query}%'"
    tasks = conn.execute(sql).fetchall()
    conn.close()
    
    return jsonify([dict(t) for t in tasks])


@app.route("/users", methods=["POST"])
def create_user():
    """Create a new user."""
    data = request.get_json()
    
    # INTENTIONAL: Weak password hashing (MD5)
    password = data.get("password", "")
    password_hash = hashlib.md5(password.encode()).hexdigest()
    
    conn = get_db()
    try:
        conn.execute(
            "INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)",
            (data.get("username"), data.get("email"), password_hash)
        )
        conn.commit()
    except sqlite3.IntegrityError:
        conn.close()
        return jsonify({"error": "Username already exists"}), 409
    
    conn.close()
    return jsonify({"message": "User created"}), 201


@app.route("/users/<username>", methods=["GET"])
def get_user(username):
    """Get user by username."""
    conn = get_db()
    user = conn.execute("SELECT id, username, email, created_at FROM users WHERE username = ?", (username,)).fetchone()
    conn.close()
    
    if not user:
        return jsonify({"error": "User not found"}), 404
    
    return jsonify(dict(user))


# INTENTIONAL: No rate limiting on any endpoint
# INTENTIONAL: No authentication/authorization
# INTENTIONAL: No CORS configuration
# INTENTIONAL: No request size limits


if __name__ == "__main__":
    init_db()
    # INTENTIONAL: Debug mode enabled in production
    app.run(debug=DEBUG_MODE, host="0.0.0.0", port=5000)
