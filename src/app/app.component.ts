import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthorizeService } from '../../src/providers/authorize.service';
import { Observable, Subscriber, Subscription } from 'rxjs';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    public currentUser;
    public state: Subscription;
    constructor(
        public auth: AuthorizeService,
        private ref: ChangeDetectorRef,
    ) { }

    ngOnInit() {
        this.auth.getState()
            .subscribe((user) => {
                this.currentUser = user;
                this.ref.detectChanges();
            }
        );
    }

    logOut(): void {
        this.auth.logout().then()
    }

}
