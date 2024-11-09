from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

# Create a new instance of SQLAlchemy
db = SQLAlchemy()

class Task(db.Model):
    __tablename__ = 'tasks'  # Optional: specify the table name

    id = db.Column(db.Integer, primary_key=True)
    creation_date = db.Column(db.DateTime, default=datetime.utcnow)
    entity_name = db.Column(db.String(100), nullable=False)
    task_type = db.Column(db.String(100), nullable=False)
    task_time = db.Column(db.DateTime, nullable=False)
    contact_person = db.Column(db.String(100), nullable=False)
    note = db.Column(db.String(200), nullable=True)
    status = db.Column(db.String(10), default='open')

    def __repr__(self):
        return f'<Task {self.id}: {self.entity_name}, {self.task_type}>'