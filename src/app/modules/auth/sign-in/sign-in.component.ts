import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../../../core/user/user.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [SharedModule, HttpClientModule],
  templateUrl: './sign-in.component.html',
  providers: [AuthService, UserService, RouterLink]
})
export class SignInComponent implements OnInit {
  @ViewChild('signInNgForm') signInNgForm!: NgForm;
  signInForm!: FormGroup;

  showAlert: boolean = false;

  constructor(private _formBuilder: FormBuilder,
    private _router: Router,
    private authService: AuthService,
    private activatedRouter: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.signInForm = this._formBuilder.group({
      email: ['',
        [
          Validators.compose([
            Validators.required,
            Validators.email,
            Validators.maxLength(60),
            Validators.minLength(4)
          ])
        ],
      ],
      password: ['',
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
    if (this.signInForm.invalid) {
      return;
    }

    this.showAlert = false;

    this.authService.signIn(this.signInForm.value)
      .subscribe(
        (data) => {
          localStorage.setItem('username', data.username);
          const redirectURL = this.activatedRouter.snapshot.queryParamMap.get('redirectURL') || '/dashboard';

          this._router.navigateByUrl(redirectURL);
        },
        (error) => {
          // Re-enable the form
          this.signInForm.enable();

          // Reset the form
          this.signInNgForm.resetForm();

          // Show the alert
          this.showAlert = true;

          // Handle the error
          if (error.error.type === 'error') {
            console.error('An error occurred:', error);
          }
        }
      );
  }


}
