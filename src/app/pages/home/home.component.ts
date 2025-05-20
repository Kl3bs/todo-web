import { TaskService } from './../../services/task.service';
import { Task } from './../../models/task.model';
import {
  Component,
  effect,
  inject,
  OnDestroy,
  OnInit,
  signal,
  ViewChild,
  untracked,
} from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { CardComponent } from '../../components/card/card.component';
import { ModalFormComponent } from '../../components/modal-form/modal-form.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [CardComponent, ModalFormComponent, AsyncPipe],
  providers: [NgxSpinnerService],
  standalone: true, // Added this as you're using imports in component
})
export class HomeComponent implements OnInit, OnDestroy {
  private taskService = inject(TaskService);

  public isCollapsed = true;
  task_list$: Observable<Task[]>;
  taskSubscription: Subscription;
  loading = new BehaviorSubject<boolean>(false);

  taskSignalList = signal<Task[]>([]);

  taskEffect = effect(() => {
    const currentTasks = this.taskService.currentTaskSignal();

    // Prevent circular updates
    untracked(() => {
      this.taskSignalList.set(currentTasks);
    });
  });

  ngOnInit(): void {
    this.getAllTasks();

    this.taskSubscription = this.taskService.refreshNeeded.subscribe(() => {
      this.getAllTasks();
    });
  }

  ngOnDestroy(): void {
    this.taskSubscription.unsubscribe();
  }

  private getAllTasks() {
    this.task_list$ = this.taskService.getAll();

    this.task_list$.subscribe((tasks) => {
      this.taskService.currentTaskSignal.set(tasks);
    });
  }

  task: Task = {
    title: 'Atividade 02',
    description: 'Olá, eu sou a tarefa 1',
    place: 'Natal - RN',
    date_hour: '2022-12-1',
    duration_time: 120,
    id: 2,
  };

  changeTaskTitle(title: string) {
    this.task = { ...this.task, title };
    console.log('Nova task: ', this.task);
  }
}
