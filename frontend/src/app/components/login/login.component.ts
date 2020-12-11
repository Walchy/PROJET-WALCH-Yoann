import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpService} from '../../service/http.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  loginFormSubscription: Subscription;
  constructor(private readonly formBuilder: FormBuilder, private httpService: HttpService) {
    this.loginForm = this.formBuilder.group({
      login: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log(this.loginForm.getRawValue());
      this.httpService.PostLogin(this.loginForm.value).subscribe(res => {
        if (res && res.success) {
          alert('Ça marche tu es connecté !');
        } else {
          alert('Tu es rejeté vil chenapan !');
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.loginFormSubscription.unsubscribe();
  }
}
