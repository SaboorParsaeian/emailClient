import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';

interface UsernameavalaibleResponse {
  available:boolean;
}

interface SignUpCredential{
  username: string;
  password: string;
  passwordConfirmation: string;
}

interface SignupResponse {
  username: string;
}

interface signedinResponse {
  authenticated: boolean;
  username: string;
}

interface signinResponse {
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  rootUrl = 'https://api.angular-email.com';
  signedin$ = new BehaviorSubject(null);
  username = '';

  constructor(private http: HttpClient) { }

  usernameAvailable(username: string){
    return this.http.post<UsernameavalaibleResponse>( `${this.rootUrl}/auth/username `,{username})
  }

  signUp(credentinal:any){
    return this.http.post<SignupResponse>( `${this.rootUrl}/auth/signup`, {username: credentinal.username, password: credentinal.password, passwordConfirmation: credentinal.passwordConfirmation},{withCredentials:true})
    .pipe(
      tap(({username}) => {
        this.signedin$.next(true);
        this.username = username;
      }
    ))
  }

  checkAuth(){
    return this.http.get<signedinResponse>(`${this.rootUrl}/auth/signedin`,{withCredentials:true}).pipe(
      tap(({authenticated, username})=> {
        this.username = username;
        this.signedin$.next(authenticated);
      })
    )
  }

  signout(){
    return this.http.post(`${this.rootUrl}/auth/signout`,{}).pipe(
      tap(()=>this.signedin$.next(false))
    )
  }

  signin(credentinal){
    return this.http.post<signinResponse>(`${this.rootUrl}/auth/signin`,{username: credentinal.username, password: credentinal.password}).pipe(
      tap(({username})=>{
        this.username = username
        this.signedin$.next(true)
      })
    )

  }
}
