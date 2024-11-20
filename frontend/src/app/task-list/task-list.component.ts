import { Component, OnInit } from '@angular/core';
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

  // Filter properties
  filterCriteria = {
    teamMember: '',
    taskType: '',
    status: '',
    date: '',
    entityName: '',
    contactPerson: '',
  };

  // Sort properties
  sortField: keyof Task = 'task_time';
  sortDirection: 'asc' | 'desc' = 'desc';

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.loadTasks();
  }

  // Task Management Functions
  editTask(task: Task) {
    this.editingTask = { ...task };
    this.showEditModal = true;
  }

  deleteTask(taskId: number) {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(taskId).subscribe(() => {
        this.tasks = this.tasks.filter((t) => t.id !== taskId);
        this.applyFilters();
      });
    }
  }

  duplicateTask(task: Task) {
    const duplicatedTask: Partial<Task> = {
      team_member: task.team_member,
      task_type: task.task_type,
      status: 'pending',
      task_time: task.task_time,
      entity_name: task.entity_name,
      contact_person: task.contact_person,
      note: task.note,
    };

    this.taskService.createTask(duplicatedTask as Task).subscribe((newTask) => {
      this.tasks.push(newTask);
      this.applyFilters();
    });
  }

  onTaskSave(updatedTask: Task) {
    if (this.editingTask?.id) {
      this.taskService
        .updateTask(this.editingTask.id, updatedTask)
        .subscribe((task) => {
          const index = this.tasks.findIndex((t) => t.id === task.id);
          if (index !== -1) {
            this.tasks[index] = task;
            this.applyFilters();
          }
        });
    }
    this.showEditModal = false;
    this.editingTask = null;
  }

  onModalClose() {
    this.showEditModal = false;
    this.editingTask = null;
  }

  private loadTasks() {
    this.taskService.getTasks().subscribe((tasks) => {
      console.log('Loaded tasks:', tasks);
      this.tasks = tasks;
      this.filteredTasks = [...tasks];
      this.applyFilters();
    });
  }

  applyFilters() {
    this.filteredTasks = this.tasks.filter((task) => {
      return (
        (!this.filterCriteria.teamMember ||
          task.team_member
            .toLowerCase()
            .includes(this.filterCriteria.teamMember.toLowerCase())) &&
        (!this.filterCriteria.taskType ||
          task.task_type
            .toLowerCase()
            .includes(this.filterCriteria.taskType.toLowerCase())) &&
        (!this.filterCriteria.status ||
          task.status.toLowerCase() ===
            this.filterCriteria.status.toLowerCase()) &&
        (!this.filterCriteria.date ||
          this.isSameDate(
            new Date(task.task_time),
            new Date(this.filterCriteria.date)
          )) &&
        (!this.filterCriteria.entityName ||
          task.entity_name
            .toLowerCase()
            .includes(this.filterCriteria.entityName.toLowerCase())) &&
        (!this.filterCriteria.contactPerson ||
          task.contact_person
            .toLowerCase()
            .includes(this.filterCriteria.contactPerson.toLowerCase()))
      );
    });
    this.sortTasks();
  }

  sortTasks() {
    this.filteredTasks.sort((a, b) => {
      const aValue = a[this.sortField];
      const bValue = b[this.sortField];

      if (this.sortField === 'task_time') {
        const aTime = new Date(aValue as string).getTime();
        const bTime = new Date(bValue as string).getTime();
        return this.sortDirection === 'asc' ? aTime - bTime : bTime - aTime;
      }

      if (aValue < bValue) return this.sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
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

  private isSameDate(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }
}
