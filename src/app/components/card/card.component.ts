import { MainFormComponent } from './../main-form/main-form.component';
import { Task } from './../../models/task.model';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  @Input() taskData: Task;
  @Output() emitTaskId = new EventEmitter<number>();

  constructor(private modalService: NgbModal) {}

  open(task: Task) {
    const modalRef = this.modalService.open(MainFormComponent);
    modalRef.componentInstance.data = task;
  }

  deleteTask(id: number) {
    this.emitTaskId.emit(id);
  }
}
