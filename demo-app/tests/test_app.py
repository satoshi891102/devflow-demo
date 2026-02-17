"""Tests for TaskFlow API."""

import pytest
from flask_testing import TestCase  # INTENTIONAL: This import will fail (missing dep)

from app import app, init_db


class TestTaskAPI(TestCase):
    """Test the task management API."""

    def create_app(self):
        app.config["TESTING"] = True
        return app

    def setUp(self):
        init_db()

    def test_list_tasks_empty(self):
        """Test listing tasks when database is empty."""
        response = self.client.get("/tasks")
        assert response.status_code == 200
        assert response.json == []

    def test_create_task(self):
        """Test creating a new task."""
        response = self.client.post(
            "/tasks",
            json={"title": "Test task", "description": "A test"},
        )
        assert response.status_code == 201

    def test_create_task_missing_title(self):
        """Test creating a task without title fails."""
        response = self.client.post("/tasks", json={})
        assert response.status_code == 400

    def test_get_task(self):
        """Test getting a single task."""
        self.client.post("/tasks", json={"title": "Test"})
        response = self.client.get("/tasks/1")
        assert response.status_code == 200
        assert response.json["title"] == "Test"

    def test_get_task_not_found(self):
        """Test getting a non-existent task."""
        response = self.client.get("/tasks/999")
        assert response.status_code == 404

    def test_delete_task(self):
        """Test deleting a task."""
        self.client.post("/tasks", json={"title": "To delete"})
        response = self.client.delete("/tasks/1")
        assert response.status_code == 200
