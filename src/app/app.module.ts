import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { TodosComponent } from './pages/todos/todos.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { EditTodoComponent } from './pages/todo-item/edit-todo.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AngularFireAuth } from '@angular/fire/auth';
import { ModalModule } from './pages/modal/modal.module';




@NgModule({
  declarations: [
    AppComponent,
    TodosComponent,
    EditTodoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AppRoutingModule,
    DragDropModule,
    ModalModule
  ],
  providers: [AngularFirestore, AngularFireAuth],
  bootstrap: [AppComponent],
})
export class AppModule { }
