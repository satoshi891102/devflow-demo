"""Tests for TaskFlow API.

INTENTIONAL: Some tests have bugs for Sentinel to detect and fix.
"""

import json
import pytest
import sqlite3
import os
from app import app, init_db


@pytest.fixture
def client():
    """Create test client."""
    app.config["TESTING"] = True
    
    # Use test database
    import app as app_module
    app_module.DATABASE = "test_tasks.db"
    
    init_db()
    
    with app.test_client() as client:
        yield client
    
    # Cleanup
    if os.path.exists("test_tasks.db"):
        os.remove("test_tasks.db")


class TestHealthCheck:
    def test_health_returns_ok(self, client):
        response = client.get("/health")
        assert response.status_code == 200
        data = json.loads(response.data)
        assert data["status"] == "ok"


class TestTasks:
    def test_list_tasks_empty(self, client):
        response = client.get("/tasks")
        assert response.status_code == 200
        data = json.loads(response.data)
        assert data == []

    def test_create_task(self, client):
        response = client.post("/tasks", json={"title": "Test task"})
        assert response.status_code == 201

    def test_create_task_no_title(self, client):
        response = client.post("/tasks", json={"description": "No title"})
        assert response.status_code == 400

    def test_get_task(self, client):
        # Create a task first
        client.post("/tasks", json={"title": "Get me"})
        response = client.get("/tasks/1")
        assert response.status_code == 200
        data = json.loads(response.data)
        assert data["title"] == "Get me"

    def test_get_task_not_found(self, client):
        response = client.get("/tasks/999")
        assert response.status_code == 404

    def test_update_task(self, client):
        client.post("/tasks", json={"title": "Update me"})
        response = client.put("/tasks/1", json={"title": "Updated"})
        assert response.status_code == 200

    def test_delete_task(self, client):
        client.post("/tasks", json={"title": "Delete me"})
        response = client.delete("/tasks/1")
        assert response.status_code == 200

    def test_delete_task_not_found(self, client):
        response = client.delete("/tasks/999")
        assert response.status_code == 404

    # INTENTIONAL BUG: This test will fail because the redirect URL check
    # expects /tasks but the API returns relative to the current path
    def test_task_filter_by_status(self, client):
        client.post("/tasks", json={"title": "Pending task", "status": "pending"})
        client.post("/tasks", json={"title": "Done task", "status": "done"})
        response = client.get("/tasks?status=pending")
        data = json.loads(response.data)
        # INTENTIONAL: Wrong assertion — expects 1 but SQL injection breaks this
        assert len(data) >= 1

    def test_search_tasks(self, client):
        client.post("/tasks", json={"title": "Important meeting"})
        client.post("/tasks", json={"title": "Buy groceries"})
        response = client.get("/tasks/search?q=meeting")
        data = json.loads(response.data)
        assert len(data) == 1
        assert "meeting" in data[0]["title"].lower()


class TestUsers:
    def test_create_user(self, client):
        response = client.post("/users", json={
            "username": "testuser",
            "email": "test@example.com",
            "password": "secret123"
        })
        assert response.status_code == 201

    def test_create_duplicate_user(self, client):
        client.post("/users", json={"username": "dupe", "password": "pass"})
        response = client.post("/users", json={"username": "dupe", "password": "pass"})
        assert response.status_code == 409

    def test_get_user(self, client):
        client.post("/users", json={
            "username": "findme",
            "email": "find@example.com",
            "password": "pass"
        })
        response = client.get("/users/findme")
        assert response.status_code == 200
        data = json.loads(response.data)
        assert data["username"] == "findme"
        # Ensure password hash is NOT returned
        assert "password_hash" not in data

    def test_get_user_not_found(self, client):
        response = client.get("/users/nobody")
        assert response.status_code == 404
