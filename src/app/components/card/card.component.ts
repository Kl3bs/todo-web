import { MainFormComponent } from '../main-form/main-form.component';
import { TaskService } from './../../services/task.service';
import { Task } from './../../models/task.model';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ModalFormComponent } from '../modal-form/modal-form.component';
import { NgbDropdownModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  imports: [DatePipe, NgbDropdownModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class CardComponent implements OnChanges {
  @ViewChild(ModalFormComponent) child: ModalFormComponent;

  @Input() taskData!: Task;

  private taskService = inject(TaskService);
  private modalService = inject(NgbModal);
  private cdr = inject(ChangeDetectorRef);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['taskData']) {
      //Executa alguma ação
    }
  }

  open(task: Task) {
    const modalRef = this.modalService.open(MainFormComponent);
    modalRef.componentInstance.data = task;
  }

  deleteTask(id: number) {
    this.taskService.delete(id).subscribe({
      next: () => {
        console.log('Tarefa removida com sucesso!');
      },
      error: () => {
        console.error('Houve um erro ao remover a tarefa!');
      },
    });
  }
}
