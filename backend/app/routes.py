from flask import Blueprint, jsonify, request
from .models import Task
from . import db
from datetime import datetime

bp = Blueprint('main', __name__)

@bp.route('/')
def home():
    return jsonify({'message': 'Welcome to the Task List API!'})

@bp.route('/tasks', methods=['POST'])
def create_task():
    try:
        data = request.get_json()
        
        # Convert task_time string to datetime object
        task_time = datetime.strptime(data['task_time'], '%Y-%m-%dT%H:%M')
        
        # Create new task with current timestamp
        new_task = Task(
            creation_date=datetime.utcnow(),  # Add current timestamp
            entity_name=data['entity_name'],
            task_type=data['task_type'],
            task_time=task_time,  # Use converted datetime
            contact_person=data['contact_person'],
            note=data.get('note', ''),
            status='open'  # Default status
        )
        
        db.session.add(new_task)
        db.session.commit()
        
        return jsonify({"message": "Task created successfully"}), 201
        
    except Exception as e:
        db.session.rollback()
        print(f"Error: {str(e)}")  # Debug log
        return jsonify({"error": str(e)}), 500

@bp.route('/tasks', methods=['GET'])
def get_tasks():
    query = Task.query
    filters = request.args

    # Filtering by query parameters
    if 'contact_person' in filters:
        query = query.filter(Task.contact_person == filters['contact_person'])
    if 'task_type' in filters:
        query = query.filter(Task.task_type == filters['task_type'])
    if 'status' in filters:
        query = query.filter(Task.status == filters['status'])
    if 'entity_name' in filters:
        query = query.filter(Task.entity_name == filters['entity_name'])
    if 'date' in filters:
        query = query.filter(Task.creation_date == filters['date'])

    tasks = query.all()
    return jsonify([{
        'id': task.id,
        'creation_date': task.creation_date,
        'entity_name': task.entity_name,
        'task_type': task.task_type,
        'task_time': task.task_time,
        'contact_person': task.contact_person,
        'note': task.note,
        'status': task.status
    } for task in tasks])

@bp.route('/tasks/<int:task_id>', methods=['PUT'])
def update_task(task_id):
    data = request.json
    task = Task.query.get_or_404(task_id)
    task.entity_name = data['entity_name']
    task.task_type = data['task_type']
    task.task_time = data['task_time']
    task.contact_person = data['contact_person']
    task.note = data.get('note')
    task.status = data.get('status', task.status)
    db.session.commit()
    return jsonify({'message': 'Task updated'})

@bp.route('/tasks/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    task = Task.query.get_or_404(task_id)
    db.session.delete(task)
    db.session.commit()
    return jsonify({'message': 'Task deleted'})