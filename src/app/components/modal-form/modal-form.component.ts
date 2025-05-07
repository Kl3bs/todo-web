import { TaskService } from './../../services/task.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { UntypedFormBuilder, Validators } from '@angular/forms';

import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.css'],
})
export class ModalFormComponent implements OnInit {
  closeResult = '';

  constructor(
    private modalService: NgbModal,
    private fb: UntypedFormBuilder,
    private taskService: TaskService,
    private toastService: HotToastService
  ) {}

  task_form = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    place: ['', Validators.required],
    date_hour: ['', Validators.required],
    duration_time: ['', Validators.required],
  });

  ngOnInit() {}

  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'task-modal' })
      .result.then(
        (result) => {
          if (result) {
            let obj = this.task_form.value;
            obj.date_hour = `${obj.date_hour.year}-${obj.date_hour.month}-${obj.date_hour.day}`;

            try {
              this.taskService.create(obj).subscribe((response) => {
                console.log(response);
                this.task_form.reset();
                this.toastService.success('Tarefa criada com sucesso!');
              });
            } catch (error) {
              console.error(error);
            }
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
