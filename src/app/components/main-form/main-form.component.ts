import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { HotToastService } from '@ngneat/hot-toast';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-main-form',
  templateUrl: './main-form.component.html',
  styleUrls: ['./main-form.component.css'],
})
export class MainFormComponent implements OnInit {
  closeResult = '';
  data: Task;

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
    let date = this.getJsonDate(this.data.date_hour);

    this.task_form.setValue({
      title: this.data.title,
      description: this.data.description,
      place: this.data.place,
      date_hour: {
        year: date.yy,
        month: date.mm,
        day: date.dd,
      },
      duration_time: this.data.duration_time,
    });
  }

  getJsonDate(text: string) {
    var { 0: y, 1: m, 2: d } = text.split('-');
    let dd = parseInt(d);
    let mm = parseInt(m);
    let yy = parseInt(y);

    return { yy, mm, dd };
  }

  dismiss() {
    this.modalService.dismissAll();
  }
  onSubmit() {
    let task = this.task_form.value;
    Object.assign(task, { id: this.data.id });
    task.date_hour = `${task.date_hour.year}-${task.date_hour.month}-${task.date_hour.day}`;

    try {
      this.taskService.update(task).subscribe((response) => {
        this.toastService.success('Tarefa editada com sucesso!');
        this.modalService.dismissAll();
      });
    } catch (error) {
      console.error(error);
      this.toastService.error('Não foi possível editar a tarefa!');
    }
  }
}
