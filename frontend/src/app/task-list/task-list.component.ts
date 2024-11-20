import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  editingTask: Task | null = null;

  constructor(private taskService: TaskService) {
    this.taskService.tasks$.subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  ngOnInit() {
    this.taskService.getTasks().subscribe();
  }

  startEdit(task: Task) {
    this.editingTask = { ...task };
  }

  saveEdit() {
    if (this.editingTask && this.editingTask.id) {
      this.taskService
        .updateTask(this.editingTask.id, this.editingTask)
        .subscribe({
          next: () => {
            this.taskService.getTasks().subscribe();
            this.editingTask = null;
          },
          error: (error) => console.error('Error updating task:', error),
        });
    }
  }

  cancelEdit() {
    this.editingTask = null;
  }

  deleteTask(taskId: number) {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(taskId).subscribe({
        next: () => {
          this.taskService.getTasks().subscribe();
        },
        error: (error) => console.error('Error deleting task:', error),
      });
    }
  }

  duplicateTask(task: Task) {
    const duplicatedTask = { ...task } as Partial<Task>;
    delete duplicatedTask.id;
    this.taskService.addTask(duplicatedTask).subscribe();
  }

  closeTask(task: Task) {
    this.taskService
      .updateTask(task.id, { ...task, status: 'completed' })
      .subscribe();
  }
}
