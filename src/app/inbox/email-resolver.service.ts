import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { catchError, Observable, EMPTY } from 'rxjs';
import { Email } from './email';
import { EmailService } from './email.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EmailResolverService implements Resolve<Email> {

  constructor(private emailService: EmailService, private router: Router) { 
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Email | Observable<Email> | Promise<Email> {

    const {id} = route.params
    return this.emailService.getEmail(id).pipe(
      catchError(()=>{
        this.router.navigateByUrl('/inbox/not-found');
        return EMPTY //beacuse we have to return an observable from catchError
      })
    )

    // return {
    //   id: '1',
    //   subject: '2',
    //   text: '3',
    //   to: '4',
    //   from: '5',
    //   html: '6'
    // }
  }
}
