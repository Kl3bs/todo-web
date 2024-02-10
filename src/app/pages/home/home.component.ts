import { TaskService } from './../../services/task.service';
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { BehaviorSubject } from 'rxjs';
import { HotToastService } from '@ngneat/hot-toast';
import { Task } from 'src/app/models/task.model';
import { IApiResponse } from 'src/app/models/IApiRespose';
import { error } from 'console';

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
    private dataService: DataService,
    private toastService: HotToastService
  ) {}

  loading = new BehaviorSubject<boolean>(false);

  ngOnInit(): void {
    this.getAllTasks();

    this.taskService.refreshNeeded.subscribe(() => {
      this.getAllTasks();
    });
  }

  private getAllTasks() {
    this.taskService.getAll().subscribe((response) => {
      this.dataService.changeTaskList(response);

      this.dataService.currentTasks.subscribe(
        (response: IApiResponse<Task[]>) => {
          this.task_list = response.tasks;
        }
      );
    });
  }

  deleteTask(id: number) {
    try {
      this.taskService.delete(id).subscribe((response) => {
        this.toastService.success('Tarefa removida com sucesso!');
      });
    } catch (error) {
      this.toastService.error('Houve um erro ao remover a tarefa!');
    }
  }

  addNewTask(task: Task) {
    console.log(task);

    this.taskService.create(task).subscribe(
      (response) => {
        this.toastService.success('Tarefa criada com sucesso!');
      },

      (error) => {
        this.toastService.error('Houve um erro ao criar a tarefa!');
        console.error(error);
      }
    );
  }
}
