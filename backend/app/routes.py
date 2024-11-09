from flask import Blueprint, jsonify, request
from .models import Task
from . import db

bp = Blueprint('main', __name__)

@bp.route('/')
def home():
    return jsonify({'message': 'Welcome to the Task List API!'})

@bp.route('/tasks', methods=['POST'])
def create_task():
    data = request.json
    new_task = Task(
        entity_name=data['entity_name'],
        task_type=data['task_type'],
        task_time=data['task_time'],
        contact_person=data['contact_person'],
        note=data.get('note')
    )
    db.session.add(new_task)
    db.session.commit()
    return jsonify({'message': 'Task created'}), 201

@bp.route('/tasks', methods=['GET'])
def get_tasks():
    tasks = Task.query.all()
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