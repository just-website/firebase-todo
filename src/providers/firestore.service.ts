import {Injectable, OnInit} from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection, DocumentData } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { Todo } from 'src/models/todo.model';
import { AuthorizeService } from './authorize.service';

@Injectable({
    providedIn: 'root'
})

export class FireStoreService implements OnInit {
    public item: Observable<any>;
    private userID: string;

    constructor(
        public db: AngularFirestore,
        public auth: AuthorizeService
    ) {
    }
    
    ngOnInit() {
        
    }

    getTodoItem<T>(id: string): AngularFirestoreDocument<T> {
        this.userID = this.auth.getUserId();
        return this.db.collection('Users').doc(this.userID).collection('Todos').doc(id);
    }

    getAllTodoItems(): AngularFirestoreCollection<DocumentData> {
        this.userID = this.auth.getUserId();
        return this.db.collection('Users').doc(this.userID).collection('Todos');
    }

    removeTodoItem(id): void {
        this.userID = this.auth.getUserId();
        this.db.collection('Users').doc(this.userID).collection('Todos').doc(id).delete();
    }
    
    addTodoItem(todo: Todo): void {
        this.userID = this.auth.getUserId();
        this.db.collection('Users').doc(this.userID).collection('Todos').add(todo);
    }

    updateTodoItem<T>(id: string, data: T): void {
        this.userID = this.auth.getUserId();
        this.db.collection('Users').doc(this.userID).collection('Todos').doc(id).update(data);
    }

    addUser( id: string): void {
        this.userID = this.auth.getUserId();
        this.db.collection('Users').doc(id).set({id});
    }
}