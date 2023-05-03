import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { take,skipWhile, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  constructor(private authService: AuthService, private router:Router){}
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.signedin$.pipe(
      skipWhile((value)=> value === null),// before checkAuth() 
      take(1),// take === complete cause in guard we have to complete observabe but we need signedin so we dont want to complete it
      tap((signedIn)=>{
        if (!signedIn){
          this.router.navigateByUrl('/')
        }
      })
    )
  }
}
