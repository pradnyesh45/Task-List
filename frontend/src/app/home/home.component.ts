import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';

export class HomeComponent implements OnInit {
  tasks: any[] = [];
  constructor(private taskService: TaskService) {
    this.taskService.tasks$.subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  ngOnInit() {
    this.taskService.getTasks();
  }

  onTaskCreated() {
    this.taskService.getTasks();
  }
}
