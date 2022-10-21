import { Task } from './../../models/task.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public isCollapsed = true;

  task_list: Task[] = [
    {
      id: 1,
      title: 'Notificação de teste',
      description: 'Olá, eu sou apenas um teste!',
      duration_time: '01:00:00',
      date_hour: '2022-10-24T18:00:00.000Z',
      place: 'Maceió-AL',
    },
    {
      id: 16,
      title: 'Apenas um teste 2',
      description: 'Olá, eu sou o terceiro teste.',
      duration_time: '01:00:00',
      date_hour: '2022-10-24T21:00:00.000Z',
      place: 'Maceió-AL',
    },
    {
      id: 17,
      title: 'Apenas um teste 3',
      description: 'Olá, eu sou o terceiro teste.',
      duration_time: '01:00:00',
      date_hour: '2022-10-24T21:00:00.000Z',
      place: 'Maceió-AL',
    },
    {
      id: 18,
      title: 'Apenas um teste 4',
      description: 'Olá, eu sou o terceiro teste.',
      duration_time: '01:00:00',
      date_hour: '2022-10-24T21:00:00.000Z',
      place: 'Maceió-AL',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
