import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';

import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.css'],
})
export class ModalFormComponent implements OnInit {
  closeResult = '';

  @Output() emitNewTask = new EventEmitter<Task>();

  constructor(private modalService: NgbModal, private fb: FormBuilder) {}

  task_form = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    place: ['', Validators.required],
    full_date: ['', Validators.required],
    duration_time: ['', Validators.required],
  });

  ngOnInit() {}

  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'task-modal' })
      .result.then(
        (result) => {
          if (result) {
            console.log(this.task_form.value);
            let obj = this.task_form.value;
            obj.full_date = `${obj.full_date.year}-${obj.full_date.month}-${obj.full_date.day}`;

            this.emitNewTask.emit(obj as Task);
          }
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  dismiss() {
    this.modalService.dismissAll();
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
