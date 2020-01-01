import { Component, OnInit, OnDestroy } from '@angular/core';
import { Lables } from '../../../providers/lables.service';
import { Todo } from 'src/models/todo.model';
import { FireStoreService } from 'src/providers/firestore.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

@Component({
    selector: 'app-new-todo',
    templateUrl: './edit-todo.component.html',
    styleUrls: ['./edit-todo.component.scss']
})
export class EditTodoComponent implements OnInit, OnDestroy {

    public lables: string[];
    public todo: Todo;
    public id: string;
    public $route: Subscription;

    constructor(
        public db: FireStoreService,
        public router: Router,
        public ar: ActivatedRoute
    ) {
        this.lables = Lables;
        this.$route = this.ar.params.subscribe(params => this.id = params['id'])
    }

    ngOnInit() {
        this.todo = {
            title: '',
            description: ''
        }
        if (this.id) {
            const todoDoc = this.db.getTodoItem<Todo>(this.id);
            todoDoc.valueChanges().subscribe(data => this.todo = data);
        }
    }

    ngOnDestroy() {
        this.$route.unsubscribe();
    }

    setColor(color): void {
        this.todo.color = color;
    }

    saveTodo(): void {
        if (this.id) {
            this.db.updateTodoItem<Todo>(this.id, this.todo);
        } else {
            this.todo.date = Date.now();
            this.db.addTodoItem(this.todo);
        }
        this.router.navigate(
            ['/']
        );
    }

}
