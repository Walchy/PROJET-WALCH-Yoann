import { Component, OnInit } from '@angular/core';
import {ApiService } from "../api.service";
import {Observable, Subscription } from 'rxjs';
import {User} from '../models/user';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { CreateJwt } from '../../shared/actions/jwt-action';


@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})

export class ConnexionComponent implements OnInit {
  
  userForm : FormGroup;

  constructor(private fb: FormBuilder,private api : ApiService, private router: Router,private store : Store) { }

  user$ : Observable<User>;

  subscription: Subscription = null;


  ngOnInit() {
    this.userForm = this.fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnDestroy () {
    if (this.subscription != null) {
      console.log ("unsubsribe");
      this.subscription.unsubscribe ()  
    }
  }


  Connexion () {
    if (this.subscription != null) {
      console.log ("unsubsribe");
      this.subscription.unsubscribe ()  
    }
    this.subscription = this.api.postLogin (this.userForm.value.login,this.userForm.value.password).subscribe (j => {console.log (j) ; this.user$ = this.api.getLogin (this.userForm.value.login);},this.user$ = null);
  }

  Deconnexion () {
    this.user$ = null;
    this.store.dispatch(new CreateJwt({"token":""}));
    this.router.navigate(['/']);
  }
}
