import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private taskSource: any = new BehaviorSubject([]);
  currentTasks = this.taskSource.asObservable();
  constructor() {}

  changeTaskList(taskList: Task[]) {
    this.taskSource.next(taskList);
  }
}
