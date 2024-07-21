import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './sign-in.component.html',
})
export class SignInComponent implements OnInit{
  @ViewChild('signInNgForm') signInNgForm!: NgForm;
  signInForm!: FormGroup;

  constructor(private _formBuilder: FormBuilder,
    private _router: Router
  ){}

ngOnInit(): void {
  this.signInForm = this._formBuilder.group({
    email: ['admin@gmail.com',
      [
        Validators.compose([
          Validators.required,
          Validators.email,
          Validators.maxLength(60),
          Validators.minLength(4)
        ])
      ],
    ],
    password: ['admin',
      [
        Validators.compose([
          Validators.required,
          Validators.maxLength(100)
        ])
      ],
    ],
    rememberMe: ['']
  })
}

signIn() {
  this._router.navigateByUrl('/dashboard');
}

}
