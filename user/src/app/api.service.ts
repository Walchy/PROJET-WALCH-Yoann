import { Injectable } from '@angular/core';
import {Observable,of } from 'rxjs';

import { tap,catchError} from 'rxjs/operators';
import { User } from './models/user';
import {HttpClient, HttpHeaders,HttpResponse } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  urlApiLogin = "/api/login";
  urlApiAuth = "/api/auth/";
  tokenParse : String = "";

  constructor(private httpClient : HttpClient) { }

  public postLogin (login:String,password:String):Observable<User>  {
    let data :String;
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })};
      data = "login=" + login + "&pass="+password; 
      return this.httpClient.post<User> (this.urlApiLogin,data,httpOptions);  
  }

  public getLogin (login:String) : Observable<User> {
    let data :String;
    data = "login=" + login 
    console.log (data);
  
    return this.httpClient.get<User>(this.urlApiAuth + login);
  }

}                                                                                                                                                                                                                                                                                                                                                                                                                
