import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Task } from 'src/app/models/task.model';

describe('CardComponent', () => {
  let component: CardComponent;
  let modalService: NgbModal;

  beforeEach(() => {
    component = new CardComponent(modalService);
  });

  it('should set taskData when input', () => {
    const task: Task = {
      id: 1,
      title: 'title',
      description: 'description',
      place: 'place',
      date_hour: 'date_hour',
      duration_time: 120,
    };
    component.taskData = task;
    expect(component.taskData).toEqual(task);
  });

  it('should default taskData to null', () => {
    expect(component.taskData).toBeUndefined();
  });
});
