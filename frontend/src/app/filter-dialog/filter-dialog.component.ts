import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter-dialog',
  template: `
    <div class="filter-dialog">
      <h2 mat-dialog-title>Filter {{ data.column }}</h2>
      <mat-dialog-content>
        <mat-form-field appearance="outline" class="full-width">
          <input
            matInput
            [(ngModel)]="filterValue"
            placeholder="Enter filter value"
          />
        </mat-form-field>
      </mat-dialog-content>
      <mat-dialog-actions align="end">
        <button mat-button (click)="dialogRef.close()">Cancel</button>
        <button
          mat-raised-button
          color="primary"
          [mat-dialog-close]="{ column: data.column, filterValue: filterValue }"
        >
          Apply
        </button>
      </mat-dialog-actions>
    </div>
  `,
  styles: [
    `
      .filter-dialog {
        padding: 16px;
      }
      .full-width {
        width: 100%;
      }
      mat-dialog-content {
        min-width: 300px;
      }
    `,
  ],
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
  ],
})
export class FilterDialogComponent {
  filterValue: string = '';

  constructor(
    public dialogRef: MatDialogRef<FilterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { column: string }
  ) {}
}
