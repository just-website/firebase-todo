import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthorizeService {

    constructor(
        public authService: AngularFireAuth
    ) { }

    public login(email, password): Promise<firebase.auth.UserCredential> {
        return this.authService.auth.signInWithEmailAndPassword(email, password);
    }

    public logout(): Promise<void> {
        return this.authService.auth.signOut();
    }

    public createUser(email, password): Promise<firebase.auth.UserCredential> {
        return this.authService.auth.createUserWithEmailAndPassword(email, password);
    }

    public getState(): Observable<firebase.User> {
        return this.authService.authState;
    }

    public getUserId(): string {
        return this.authService.auth.currentUser.uid;
    }
}
