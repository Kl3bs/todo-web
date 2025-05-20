import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { CardComponent } from './components/card/card.component';
import { ModalFormComponent } from './components/modal-form/modal-form.component';
import { MainFormComponent } from './components/main-form/main-form.component';
import { NgxLoadingModule } from 'ngx-loading';
import { CustomHttpInterceptor } from './services/interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';

import { DxDataGridModule } from 'devextreme-angular';
import { NgxPaginationModule } from 'ngx-pagination';
import { TableComponent } from './pages/table/table.component';

@NgModule({
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    // NgxMaskModule.forRoot(),
    NgxMaskDirective,
    NgxMaskPipe,

    // HotToastModule.forRoot(),
    // NgxLoadingModule.forRoot({}),
    // NgxSpinnerModule,
    // DxDataGridModule,
    // NgxPaginationModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomHttpInterceptor,
      multi: true,
    },
    provideHttpClient(withInterceptorsFromDi()),
  ],
})
export class AppModule {}
