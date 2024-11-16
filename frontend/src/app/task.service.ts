import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from './models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:5000/tasks';

  constructor(private http: HttpClient) {}

  getTasks(filters?: {
    contact_person?: string;
    task_type?: string;
    status?: string;
    entity_name?: string;
    date?: string;
  }): Observable<Task[]> {
    let url = this.apiUrl;
    if (filters) {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
      if (params.toString()) {
        url += '?' + params.toString();
      }
    }
    return this.http.get<Task[]>(url);
  }

  addTask(task: Omit<Task, 'id' | 'creation_date'>): Observable<any> {
    return this.http.post(this.apiUrl, task);
  }

  updateTask(id: number, task: Partial<Task>): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, task);
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
