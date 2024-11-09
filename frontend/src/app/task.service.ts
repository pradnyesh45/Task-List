import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Task {
  id?: number;
  creation_date?: string;
  entity_name: string;
  task_type: string;
  task_time: string;
  contact_person: string;
  note?: string;
  status?: string;
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:5000/tasks';

  constructor(private http: HttpClient) {}

  createTask(task: Task): Observable<any> {
    return this.http.post(this.apiUrl, task);
  }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  updateTask(task: Task): Observable<any> {
    return this.http.put(`${this.apiUrl}/${task.id}`, task);
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
