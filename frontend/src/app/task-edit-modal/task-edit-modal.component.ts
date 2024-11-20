import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Input() task!: Task;
  @Input() show = false;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<Task>();

  onSave() {
    this.save.emit(this.task);
    this.close.emit();
  }

  onClose() {
    this.close.emit();
  }
}
