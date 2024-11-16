import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../task.service';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="task-form">
      <h2>Add New Task</h2>
      <form (ngSubmit)="onSubmit()">
        <div>
          <label for="entity_name">Entity Name:</label>
          <input
            id="entity_name"
            type="text"
            [(ngModel)]="task.entity_name"
            name="entity_name"
            required
          />
        </div>
        <div>
          <label for="task_type">Task Type:</label>
          <input
            id="task_type"
            type="text"
            [(ngModel)]="task.task_type"
            name="task_type"
            required
          />
        </div>
        <div>
          <label for="task_time">Task Time:</label>
          <input
            id="task_time"
            type="datetime-local"
            [(ngModel)]="task.task_time"
            name="task_time"
            required
          />
        </div>
        <div>
          <label for="contact_person">Contact Person:</label>
          <input
            id="contact_person"
            type="text"
            [(ngModel)]="task.contact_person"
            name="contact_person"
            required
          />
        </div>
        <div>
          <label for="note">Note:</label>
          <textarea id="note" [(ngModel)]="task.note" name="note"></textarea>
        </div>
        <button type="submit">Add Task</button>
      </form>
    </div>
  `,
  styles: [
    `
      .task-form {
        margin: 20px;
        max-width: 500px;
      }
      form div {
        margin-bottom: 15px;
      }
      label {
        display: block;
        margin-bottom: 5px;
      }
      input,
      select,
      textarea {
        width: 100%;
        padding: 8px;
        border: 1px solid #ddd;
        border-radius: 4px;
      }
      button {
        padding: 10px 20px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }
      button:hover {
        background-color: #0056b3;
      }
    `,
  ],
})
export class TaskFormComponent {
  task = {
    entity_name: '',
    task_type: '',
    task_time: '',
    contact_person: '',
    note: '',
    status: 'open' as const,
  };

  constructor(private taskService: TaskService) {}

  onSubmit(): void {
    this.taskService.addTask(this.task).subscribe(
      () => {
        // Reset form
        this.task = {
          entity_name: '',
          task_type: '',
          task_time: '',
          contact_person: '',
          note: '',
          status: 'open' as const,
        };
        // Optionally, emit an event to refresh the task list
      },
      (error) => {
        console.error('Error adding task:', error);
      }
    );
  }
}
