import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:5000'; // Base URL

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/tasks`);
  }

  updateTask(id: number, task: Partial<Task>): Observable<any> {
    const formattedTask = {
      ...task,
      task_time: this.formatDateForBackend(task.task_time),
    };

    return this.http
      .put(`${this.apiUrl}/tasks/${id}`, formattedTask, this.httpOptions)
      .pipe(
        catchError((error) => {
          console.error('Error details:', error);
          return throwError(() => error);
        })
      );
  }

  private formatDateForBackend(
    date: string | Date | undefined
  ): string | undefined {
    if (!date) return undefined;

    const d = new Date(date);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
      2,
      '0'
    )}-${String(d.getDate()).padStart(2, '0')}T${String(d.getHours()).padStart(
      2,
      '0'
    )}:${String(d.getMinutes()).padStart(2, '0')}`;
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/tasks/${id}`, this.httpOptions);
  }

  addTask(task: any) {
    return this.http.post<any>(`${this.apiUrl}/tasks`, task);
  }

  // ... other methods
}
