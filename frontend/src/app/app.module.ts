import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { TaskListComponent } from './task-list/task-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TaskEditModalComponent } from './task-edit-modal/task-edit-modal.component';

@NgModule({
  declarations: [AppComponent, TaskFormComponent, TaskEditModalComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    TaskListComponent,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
