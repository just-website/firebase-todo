import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { TodosComponent } from './pages/todos/todos.component';
import { AngularFirestore } from '@angular/fire/firestore';
import {Routes, RouterModule} from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { EditTodoComponent } from './pages/todo-item/edit-todo.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

const routes: Routes = [
  { path: '', component: TodosComponent},
  {path: 'todo/:id', component: EditTodoComponent},
  {path: 'new-todo', component: EditTodoComponent},
  { path: '**', redirectTo: '/'}
]

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
    AngularFireModule.initializeApp(environment.firebaseConfig),
    RouterModule.forRoot(routes),
    DragDropModule,
  ],
  providers: [AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }
