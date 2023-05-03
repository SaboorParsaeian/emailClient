import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmailService } from '../email.service';
import { switchMap } from 'rxjs';
import { Email } from '../email';

@Component({
  selector: 'app-email-show',
  templateUrl: './email-show.component.html',
  styleUrls: ['./email-show.component.css']
})
export class EmailShowComponent implements OnInit {
  email: Email;

  constructor(private route:ActivatedRoute, private emailService: EmailService) {
    //----------------------------------------------------1
    this.route.data.subscribe(({email})=>{
      this.email = email
    })
  
    //----------------------------------------------------2
    // console.log(this.route.snapshot.data)
    
   }

  ngOnInit(): void {
    //first way to get email id from url => observable
    // ----------------------------------------------------1
    // this.route.params.subscribe(({id})=>{
    //   this.emailService.getEmail(id).subscribe((email)=>{
    //     console.log(email)
    //   })
    // })
    //----------------------------------------------------1
    //second way to get email id from url => snapshot not a good idia beacuse ng on init execute one time at the first
    // console.log(this.route.snapshot.params['id'])
    // ----------------------------------------------------2 if user click fast before loading last request switch map cancel past request and start to answer for new request
    // this.route.params.pipe(
    //   switchMap(({id}) => {
    //     return this.emailService.getEmail(id)
    //   })
    // ).subscribe(
    //    (email)=>{
    //     this.email=email
    //    }
      //  error: err => {
      //   if (err.error.sataus = 401){
      //   this.returnFakeEmail();
      //   }
        
      // }
          
    // )
    // ----------------------------------------------------2
   
    
  }
  
  
}
