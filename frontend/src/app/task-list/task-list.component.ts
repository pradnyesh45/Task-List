import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task.model';
import { TaskEditModalComponent } from '../task-edit-modal/task-edit-modal.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, TaskEditModalComponent],
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  showEditModal = false;
  editingTask?: Task;

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
    this.showEditModal = true;
  }

  onSaveTask(updatedTask: any) {
    if (this.editingTask?.id) {
      this.taskService
        .updateTask(this.editingTask.id, updatedTask as Task)
        .subscribe(() => {
          this.loadTasks();
        });
    }
    this.showEditModal = false;
  }

  onCloseModal() {
    this.showEditModal = false;
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
    const { id, ...taskWithoutId } = task;
    const duplicatedTask = {
      ...taskWithoutId,
      status: 'open',
      task_time: new Date(),
    };

    this.taskService.createTask(duplicatedTask).subscribe(() => {
      this.loadTasks();
    });
  }

  closeTask(task: Task) {
    if (task.id === undefined) return;
    this.taskService
      .updateTask(task.id, {
        ...task,
        status: 'completed',
      })
      .subscribe(() => {
        this.loadTasks();
      });
  }

  private loadTasks() {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }
}
