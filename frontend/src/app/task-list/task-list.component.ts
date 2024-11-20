import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task.model';
import { TaskEditModalComponent } from '../task-edit-modal/task-edit-modal.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, TaskEditModalComponent],
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  editingTask: Task | null = null;
  showEditModal = false;
  sortField: keyof Task = 'contact_person';
  sortDirection: 'asc' | 'desc' = 'asc';
  activeDropdown: number | null = null;

  filterCriteria = {
    contactPerson: '',
    entityName: '',
    taskType: '',
    status: '',
    date: '',
  };

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.loadTasks();
  }

  createNewTask() {
    const newTask: Task = {
      id: 0,
      contact_person: '',
      entity_name: '',
      task_type: '',
      status: 'open',
      task_time: new Date().toISOString(),
      creation_date: new Date().toISOString(),
      note: '',
    };

    this.editingTask = newTask;
    this.showEditModal = true;
  }

  duplicateTask(task: Task) {
    const duplicatedTask: Task = {
      id: 0,
      contact_person: task.contact_person,
      entity_name: task.entity_name,
      task_type: task.task_type,
      status: 'open',
      task_time: new Date().toISOString(),
      creation_date: new Date().toISOString(),
      note: task.note,
    };

    this.taskService.createTask(duplicatedTask).subscribe((newTask) => {
      this.tasks.push(newTask);
      this.applyFilters();
    });
  }

  onTaskSave(task: Task) {
    if (this.editingTask?.id === 0) {
      this.taskService.createTask(task).subscribe({
        next: (createdTask) => {
          console.log('Task created:', createdTask);
          this.tasks.push(createdTask);
          this.applyFilters();
          this.showEditModal = false;
          this.editingTask = null;
        },
        error: (error) => {
          console.error('Error creating task:', error);
          alert('Failed to create task. Please try again.');
        },
      });
    } else if (this.editingTask) {
      this.taskService.updateTask(this.editingTask.id, task).subscribe({
        next: (updatedTask) => {
          const index = this.tasks.findIndex((t) => t.id === updatedTask.id);
          if (index !== -1) {
            this.tasks[index] = updatedTask;
            this.applyFilters();
          }
          this.showEditModal = false;
          this.editingTask = null;
        },
        error: (error) => {
          console.error('Error updating task:', error);
          alert('Failed to update task. Please try again.');
        },
      });
    }
  }

  onModalClose() {
    this.showEditModal = false;
    this.editingTask = null;
  }

  private loadTasks() {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
      this.applyFilters();
    });
  }

  applyFilters() {
    this.filteredTasks = this.tasks.filter((task) => {
      return (
        task.contact_person
          .toLowerCase()
          .includes(this.filterCriteria.contactPerson.toLowerCase()) &&
        task.entity_name
          .toLowerCase()
          .includes(this.filterCriteria.entityName.toLowerCase()) &&
        task.task_type
          .toLowerCase()
          .includes(this.filterCriteria.taskType.toLowerCase()) &&
        (this.filterCriteria.status === '' ||
          task.status === this.filterCriteria.status) &&
        (this.filterCriteria.date === '' ||
          task.task_time.includes(this.filterCriteria.date))
      );
    });

    this.sortTasks();
  }

  toggleSort(field: keyof Task) {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }
    this.sortTasks();
  }

  private sortTasks() {
    this.filteredTasks.sort((a, b) => {
      const aValue = a[this.sortField];
      const bValue = b[this.sortField];

      if (aValue < bValue) {
        return this.sortDirection === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return this.sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }

  editTask(task: Task) {
    this.editingTask = { ...task };
    this.showEditModal = true;
  }

  deleteTask(id: number) {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(id).subscribe(() => {
        this.tasks = this.tasks.filter((t) => t.id !== id);
        this.applyFilters();
      });
    }
  }

  toggleDropdown(taskId: number) {
    this.activeDropdown = this.activeDropdown === taskId ? null : taskId;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!(event.target as HTMLElement).closest('.dropdown')) {
      this.activeDropdown = null;
    }
  }
}
