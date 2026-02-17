"""TaskFlow — Simple task management API for DevFlow demo."""

import sqlite3
from flask import Flask, request, jsonify

app = Flask(__name__)

# INTENTIONAL VULNERABILITY: Hardcoded secret (for Sentinel to detect)
SECRET_KEY = "super_secret_key_12345"
DATABASE = "tasks.db"


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
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)
    conn.commit()
    conn.close()


@app.route("/tasks", methods=["GET"])
def list_tasks():
    """List all tasks."""
    conn = get_db()
    tasks = conn.execute("SELECT * FROM tasks ORDER BY created_at DESC").fetchall()
    conn.close()
    return jsonify([dict(t) for t in tasks])


@app.route("/tasks", methods=["POST"])
def create_task():
    """Create a new task."""
    data = request.get_json()
    if not data or not data.get("title"):
        return jsonify({"error": "Title is required"}), 400

    conn = get_db()
    # INTENTIONAL VULNERABILITY: SQL injection (for Sentinel to detect)
    query = f"INSERT INTO tasks (title, description, status, priority) VALUES ('{data['title']}', '{data.get('description', '')}', '{data.get('status', 'pending')}', '{data.get('priority', 'medium')}')"
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

    # INTENTIONAL VULNERABILITY: No input validation
    task = conn.execute("SELECT * FROM tasks WHERE id = ?", (task_id,)).fetchone()
    if not task:
        conn.close()
        return jsonify({"error": "Task not found"}), 404

    # INTENTIONAL: Missing error handling for invalid status values
    conn.execute(
        "UPDATE tasks SET title=?, description=?, status=?, priority=? WHERE id=?",
        (
            data.get("title", task["title"]),
            data.get("description", task["description"]),
            data.get("status", task["status"]),
            data.get("priority", task["priority"]),
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


if __name__ == "__main__":
    init_db()
    app.run(debug=True, port=5000)
