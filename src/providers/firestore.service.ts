import {Injectable} from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { DocumentChange } from '@angular/fire/firestore'
import { Todo } from 'src/models/todo.model';

@Injectable({
    providedIn: 'root'
}
)

export class FireStoreService {
    public item: Observable<any>;

    constructor(
        public db: AngularFirestore,
    ) {

    }

    getItem<T>(collectionName: string, id: string): AngularFirestoreDocument<T> {
        return this.db.doc(`${collectionName}/${id}`);
    }

    addItem<T>( collectionName: string, data: T) {
        const id = this.db.createId();
        const item = { id, ...data };
        this.db.collection(collectionName).doc(id).set(item);
    }

    
    updateItem<T>(collectionName: string, id: string, data: T) {
        this.db.doc(`${collectionName}/${id}`).update(data);
    }

    getAllItems<T>(collectionName: string) {
        return this.db.collection<T>(collectionName);
    }

    removeItem(id) {
        this.db.doc('Todos/' + id).delete();

    }
}