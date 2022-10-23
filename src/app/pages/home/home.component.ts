import { TaskService } from './../../services/task.service';
import { Task } from './../../models/task.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public isCollapsed = true;

  task_list: Task[] = [];

  constructor(
    private taskService: TaskService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.getAllTasks();

    this.taskService.refreshNeeded.subscribe(() => {
      this.getAllTasks();
    });
  }

  private getAllTasks() {
    this.taskService.getAll().subscribe((response) => {
      this.dataService.changeTaskList(response);

      this.dataService.currentTasks.subscribe((tasks: Task[]) => {
        this.task_list = tasks;
      });
      console.log(response);
    });
  }
}
