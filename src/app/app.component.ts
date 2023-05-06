import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  // signedin = false;
  signedin$ = new BehaviorSubject<boolean>(false);
  constructor(private authService: AuthService){
    this.signedin$ = this.authService.signedin$
  }

  ngOnInit(){
    this.authService.checkAuth().subscribe(()=>{});

    // setTimeout(() => {
    //   this.authService.signout().subscribe(()=>{})
    // }, 5000);
  }

  // ngOnInit(): void {
  //   this.authService.signedin$.subscribe(signedin =>
  //     {this.signedin = signedin})
  // }
}
