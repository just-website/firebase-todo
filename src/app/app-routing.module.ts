import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodosComponent } from './pages/todos/todos.component';
import { EditTodoComponent } from './pages/todo-item/edit-todo.component';


const routes: Routes = [
  { path: '', component: TodosComponent},
  {path: 'todo/:id', component: EditTodoComponent},
  {path: 'new-todo', component: EditTodoComponent},
  { path: '**', redirectTo: '/'}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
