import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators'
import { of } from 'rxjs';
import { Email } from './email'

interface EmailSummary{
  id:string;
  subject: string;
  from: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  rootUrl = 'https://api.angular-email.com';

  constructor(private http: HttpClient) { }

  getEmails(){
    return this.http.get<EmailSummary[]>(`${this.rootUrl}/emails`,{withCredentials:true}).pipe(
      catchError(error =>{
        return of([{
          id: 'fake Id',
          subject: 'fake subject',
          from: 'fake from' 
        }])
      })
    )
  }

  getEmail(id:string){
    return this.http.get<Email>(`${this.rootUrl}/emails/${id}`).pipe(
      catchError(error => {
        return of({
                id: id,
                subject: 'fake subject',
                text: 'fake text',
                to: 'fake to',
                from: 'fake from',
                html: '<p>fake html</p>'
              });     
      })
    )
  }

  sendEmail(email:Email){
    return this.http.post(`${this.rootUrl}/emails`, email);
  }
}
