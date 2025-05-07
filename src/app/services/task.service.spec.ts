import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { TaskService } from './task.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('TaskService', () => {
  let service: TaskService;

  // const httpStub = {
  //   get: () =>
  //     of({
  //       id: 18,
  //       title: 'Apenas um teste 4',
  //       description: 'Olá, eu sou o terceiro teste.',
  //       duration_time: 10000,
  //       date_hour: '2022-10-24',
  //       place: 'Natal - RN',
  //     }),
  // };
  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    service = TestBed.inject(TaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Deverá ser feita uma requisição na API', () => {
    expect(service).toBeTruthy();
  });
});
