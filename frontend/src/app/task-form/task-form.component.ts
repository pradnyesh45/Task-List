import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class TaskFormComponent {
  @Output() taskCreated = new EventEmitter<void>();

  task = {
    entity_name: '',
    task_type: 'call',
    task_time: '',
    contact_person: '',
    note: '',
    status: 'open',
  };

  taskTypes = ['call', 'meeting', 'video call'];

  constructor(private taskService: TaskService) {}

  onSubmit() {
    this.taskService.createTask(this.task).subscribe({
      next: () => {
        this.taskCreated.emit();
        this.resetForm();
      },
      error: (error: Error) => console.error('Error creating task:', error),
    });
  }

  private resetForm() {
    this.task = {
      entity_name: '',
      task_type: 'call',
      task_time: '',
      contact_person: '',
      note: '',
      status: 'open',
    };
  }
}
