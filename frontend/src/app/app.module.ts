import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { TaskListComponent } from './task-list/task-list.component';

@NgModule({
  declarations: [AppComponent, TaskFormComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule, TaskListComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
