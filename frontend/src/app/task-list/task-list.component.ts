import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../task.service';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="task-list">
      <h2>Tasks</h2>

      <!-- Filters -->
      <div class="filters">
        <input
          [(ngModel)]="filters.contact_person"
          placeholder="Filter by Contact Person"
          (input)="applyFilters()"
        />
        <input
          [(ngModel)]="filters.task_type"
          placeholder="Filter by Task Type"
          (input)="applyFilters()"
        />
        <input
          [(ngModel)]="filters.entity_name"
          placeholder="Filter by Entity Name"
          (input)="applyFilters()"
        />
        <select [(ngModel)]="filters.status" (change)="applyFilters()">
          <option value="">All Statuses</option>
          <option value="open">Open</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <input
          type="date"
          [(ngModel)]="filters.date"
          (change)="applyFilters()"
        />
      </div>

      <!-- Task List -->
      <ul>
        @for (task of tasks; track task.id) {
        <li>
          <div class="task-info">
            <h3>{{ task.entity_name }}</h3>
            <p>Type: {{ task.task_type }}</p>
            <p>Contact: {{ task.contact_person }}</p>
            <p>Status: {{ task.status }}</p>
            <p>Date: {{ task.creation_date | date }}</p>
            @if (task.note) {
            <p>Note: {{ task.note }}</p>
            }
          </div>
          <div class="task-actions">
            <select [(ngModel)]="task.status" (change)="updateTaskStatus(task)">
              <option value="open">Open</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            <button (click)="editTask(task)">Edit</button>
            <button (click)="deleteTask(task.id)">Delete</button>
          </div>
        </li>
        }
      </ul>
    </div>
  `,
  styles: [
    `
      .task-list {
        margin: 20px;
      }
      ul {
        list-style: none;
        padding: 0;
      }
      li {
        margin: 10px 0;
        padding: 10px;
        border: 1px solid #ddd;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    `,
  ],
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  filters = {
    contact_person: '',
    task_type: '',
    status: '',
    entity_name: '',
    date: '',
  };

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks(this.filters).subscribe(
      (tasks) => {
        this.tasks = tasks;
      },
      (error) => {
        console.error('Error loading tasks:', error);
      }
    );
  }

  applyFilters(): void {
    this.loadTasks();
  }

  updateTaskStatus(task: Task): void {
    this.taskService.updateTask(task.id, { status: task.status }).subscribe(
      () => {
        this.loadTasks();
      },
      (error) => {
        console.error('Error updating task status:', error);
      }
    );
  }

  deleteTask(id: number): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(id).subscribe(
        () => {
          this.loadTasks();
        },
        (error) => {
          console.error('Error deleting task:', error);
        }
      );
    }
  }

  editTask(task: Task): void {
    // Implement edit functionality
    // This could open a modal or navigate to an edit page
    console.log('Edit task:', task);
  }
}
