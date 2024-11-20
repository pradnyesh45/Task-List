import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-task-edit-modal',
  templateUrl: './task-edit-modal.component.html',
  styleUrls: ['./task-edit-modal.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class TaskEditModalComponent {
  @Input() task: Task = {
    id: 0,
    contact_person: '',
    entity_name: '',
    task_type: '',
    status: 'open',
    task_time: new Date().toISOString(),
    creation_date: new Date().toISOString(),
    note: '',
  };
  @Input() show = false;
  @Output() save = new EventEmitter<Task>();
  @Output() close = new EventEmitter<void>();

  onSave() {
    console.log('Modal onSave called with task:', this.task);
    this.save.emit(this.task);
  }

  onClose() {
    console.log('Modal onClose called');
    this.close.emit();
  }
}
