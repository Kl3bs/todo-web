import { environment } from './../../environments/environment';
import { Task } from './../models/task.model';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private http = inject(HttpClient);

  private taskSource = new BehaviorSubject<Task[]>([]);
  private _refresh = new Subject<void>();

  currentTasks = this.taskSource.value;

  //Signals
  currentTaskSignal = signal<Task[]>([]);

  get refreshNeeded(): Observable<any> {
    return this._refresh;
  }

  updateTaskList(taskList: Task[]) {
    //Atualiza o observable
    this.taskSource.next(taskList);

    //Atualiza o signal
    this.currentTaskSignal.set(taskList);
  }

  getAll() {
    return this.http.get<Task[]>(`${environment.BASE_URL}/tasks`);
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
    return this.http.post<Task>(`${environment.BASE_URL}/tasks`, task).pipe(
      tap((response) => {
        //Atualiza o observable
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
    return this.http.delete(`${environment.BASE_URL}/tasks/${id}`).pipe(
      tap(() => {
        this._refresh.next();
      })
    );
  }
}
