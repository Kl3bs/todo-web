import { environment } from './../../environments/environment';
import { Task } from './../models/task.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) {}

  private _refresh = new Subject<void>();

  get refreshNeeded(): Observable<any> {
    return this._refresh;
  }

  getAll() {
    return this.http.get<Task[]>(`${environment.BASE_URL}/tasks/all`);
  }

  getById(id: number) {
    return this.http.get<Task>(`${environment.BASE_URL}/tasks/${id}`);
  }

  getByTitle(title: string) {
    return this.http.get<Task[]>(
      `${environment.BASE_URL}/tasks?title_like=${title}`
    );
  }

  create(task: Task) {
    return this.http.post(`${environment.BASE_URL}/tasks/create`, task).pipe(
      tap(() => {
        this._refresh.next();
      })
    );
  }

  update(task: Task) {
    return this.http.put(`${environment.BASE_URL}/tasks/${task.id}`, task).pipe(
      tap(() => {
        this._refresh.next();
      })
    );
  }

  delete(id: number) {
    return this.http.delete(`${environment.BASE_URL}/task/delete/${id}`).pipe(
      tap(() => {
        this._refresh.next();
      })
    );
  }
}
