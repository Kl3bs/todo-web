import { TaskService } from 'src/app/services/task.service';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import {
  fromEvent,
  filter,
  debounceTime,
  distinctUntilChanged,
  tap,
} from 'rxjs';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [NgbCollapseModule],
})
export class HeaderComponent implements AfterViewInit {
  public isCollapsed = true;

  constructor(
    private dataService: DataService,
    private taskService: TaskService
  ) {}

  @ViewChild('input') input: ElementRef;

  ngAfterViewInit() {
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        filter(Boolean),
        debounceTime(300),
        distinctUntilChanged(),
        tap((text) => {
          let value = this.input.nativeElement.value;
          this.search(value);
        })
      )
      .subscribe();
  }

  search(title: string) {
    if (title.length < 2) {
      this.taskService.getAll().subscribe((response) => {
        this.dataService.changeTaskList(response);
      });
    } else {
      this.taskService.getByTitle(title).subscribe((response) => {
        this.dataService.changeTaskList(response);
      });
    }
  }
}
