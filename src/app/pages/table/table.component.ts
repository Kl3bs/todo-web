import { Task } from './../../models/task.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  readonly allowedPageSizes = [5, 10, 'all'];

  readonly displayModes = [
    { text: "Display Mode 'full'", value: 'full' },
    { text: "Display Mode 'compact'", value: 'compact' },
  ];

  displayMode = 'full';

  showPageSizeSelector = true;

  showInfo = true;

  showNavButtons = true;

  tasks: Task[] = [
    {
      title: 'Atividade 01',
      description: 'Olá, eu sou a tarefa 1',
      place: 'Natal - RN',
      full_date: '2022-12-1',
      duration_time: 120,
      ID: 1,
    },
    {
      title: 'Atividade 02',
      description: 'Olá, eu sou a tarefa 2',
      place: 'Natal - RN',
      full_date: '2022-12-1',
      duration_time: 120,
      ID: 2,
    },
    {
      title: 'Atividade 03',
      description: 'Olá, eu sou a tarefa 3',
      place: 'Natal - RN',
      full_date: '2022-12-1',
      duration_time: 120,
      ID: 3,
    },
    {
      title: 'Atividade 04',
      description: 'Olá, eu sou a tarefa 4',
      place: 'Natal - RN',
      full_date: '2022-12-1',
      duration_time: 120,
      ID: 4,
    },
    {
      title: 'Atividade 05',
      description: 'Olá, eu sou a tarefa5',
      place: 'Natal - RN',
      full_date: '2022-12-1',
      duration_time: 120,
      ID: 5,
    },
    {
      title: 'Atividade 06',
      description: 'Olá, eu sou a tarefa 6',
      place: 'Natal - RN',
      full_date: '2022-12-1',
      duration_time: 120,
      ID: 6,
    },
  ];
}
