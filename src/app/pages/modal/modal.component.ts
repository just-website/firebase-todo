import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms'
import { User } from '../../../models/user.model';
import { AuthorizeService } from 'src/providers/authorize.service';
import { FireStoreService } from 'src/providers/firestore.service';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

    @Input() modalState: string;
    @Output() onClose = new EventEmitter();
    signUpForm: FormGroup;
    loginForm: FormGroup;
    user: User;
    constructor(
        public auth: AuthorizeService,
        public db: FireStoreService
    ) {
        this.signUpForm = new FormGroup({
            email: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required]),
            confirmPassword: new FormControl('', [Validators.required, confirmPasswordValidator]),
        });
        this.loginForm = new FormGroup({
            email: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required]),
        })
    }

    ngOnInit() {
    }

    closeModal(): void {
        this.onClose.emit();
    }

    stopProp(event): void {
        event.stopPropagation()
    }

    resetForm(form): void {
        form.reset();
    }

    submit(form: FormGroup): void {
        if (form === this.signUpForm) {
            this.auth.createUser(form.value.email, form.value.password)
                .then(result => {
                    this.onClose.emit();
                    form.reset();
                    this.db.addUser(result.user.uid);
                    
                })
                .catch(error => {
                    this.signUpForm.setErrors({
                        'customError': true
                    })
                    console.log('error: ', error);
                })
        } else if (form === this.loginForm) {
            this.auth.login(form.value.email, form.value.password)
                .then( () => {
                    this.onClose.emit();
                    form.reset;
                })
                .catch(error => {
                    console.log(error);
                    this.loginForm.setErrors({
                        'customError': true
                    })
                }
            )
        }
    }

}

function confirmPasswordValidator(control: AbstractControl): ValidationErrors {
    let notConfirm;
    if (control.parent) {
        notConfirm = control.parent.value.password === control.value;
    }
    return !notConfirm ? { notConfirm: true } : null;
}