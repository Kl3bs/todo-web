import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TaskService } from 'src/app/services/task.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UntypedFormBuilder } from '@angular/forms';
import { MainFormComponent } from './main-form.component';

describe('MainFormComponent', () => {
  let component: MainFormComponent;
  let fixture: ComponentFixture<MainFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainFormComponent],
      providers: [UntypedFormBuilder, TaskService],
      imports: [HttpClientTestingModule, NgbModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
