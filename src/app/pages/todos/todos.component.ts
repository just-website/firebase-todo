import { Component, OnInit, OnDestroy } from '@angular/core';
import { FireStoreService } from '../../../providers/firestore.service';
import { Todo } from '../../../models/todo.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import {  Router } from '@angular/router';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit, OnDestroy {
  public title = 'to-do-list';
  public todos: Observable<Todo[]>;
  public isLoaded: boolean = false;
  public syncTodos: Todo[];
  public selectTodo: Todo;

  constructor(
    public db: FireStoreService,
    private router: Router,
    ) {}

  ngOnInit() {
    const collection = this.db.getAllTodoItems();
    this.todos = collection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Todo;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    )
    this.todos.subscribe(data => {
      this.isLoaded = true;
      this.syncTodos = data;
    });
  }

  ngOnDestroy() {
  }

  removeTodo(todo: Todo): void {
    this.db.removeTodoItem(todo.id);
  }

  openTodo(todo: Todo): void {
    this.router.navigate(
      ['/todo', todo.id]
    );
  }

  setStatus(todo: Todo): void {
    const done = !todo.done;
    this.db.getTodoItem<Todo>(todo.id).update({done});
  }

  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.syncTodos, event.previousIndex, event.currentIndex);
  }

  editTodo(todo: Todo): void {
    this.selectTodo = todo;
  }

  updateTodo(): void {
    this.selectTodo = null;
  }

}
