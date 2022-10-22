import { TaskService } from './../../services/task.service';
import { Task } from './../../models/task.model';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public isCollapsed = true;

  task_list: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.getAllTasks();

    this.taskService.refreshNeeded.subscribe(() => {
      this.getAllTasks();
    });
  }

  private getAllTasks() {
    this.taskService.getAll().subscribe((response) => {
      this.task_list = response;
      console.log(response);
    });
  }
}
