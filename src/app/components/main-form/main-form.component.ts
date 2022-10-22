import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { HotToastService } from '@ngneat/hot-toast';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-main-form',
  templateUrl: './main-form.component.html',
  styleUrls: ['./main-form.component.css'],
})
export class MainFormComponent implements OnInit {
  closeResult = '';
  data: any = {};

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
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

  ngOnInit(): void {
    console.log(this.data);
    this.task_form.patchValue({
      title: this.data.title,
      description: this.data.description,
      place: this.data.place,
      date_hour: {
        year: 2022,
        month: 10,
        day: 11,
      },
      duration_time: this.data.duration_time,
    });
  }

  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          if (result) {
            let obj = this.task_form.value;
            console.log(obj);
            obj.date_hour = `${obj.date_hour.year}/${obj.date_hour.month}/${obj.date_hour.day}`;

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
