import { MainFormComponent } from './../main-form/main-form.component';
import { TaskService } from './../../services/task.service';
import { Task } from './../../models/task.model';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { ModalFormComponent } from '../modal-form/modal-form.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @ViewChild(ModalFormComponent) child: ModalFormComponent;

  @Input() taskData!: Task;

  constructor(
    private taskService: TaskService,
    private toastService: HotToastService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {}

  open() {
    const modalRef = this.modalService.open(MainFormComponent);
    modalRef.componentInstance.data = {
      title: 'Notificação de teste',
      description: 'Olá, eu sou apenas um teste!',
      duration_time: 10000,
      date_hour: '2022-10-24T18:00:00.000Z',
      place: 'Maceió - AL',
    };
    console.log(modalRef);
  }

  deleteTask(id: any) {
    try {
      this.taskService.delete(id).subscribe((response) => {
        console.log(response);
        this.toastService.success('Tarefa removida com sucesso!');
      });
    } catch (error) {
      console.error(error);
      this.toastService.error('Houve um erro ao remover a tarefa!');
    }
  }
}
