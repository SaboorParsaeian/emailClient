import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidator, FormControl } from "@angular/forms";
import { catchError, map, of } from "rxjs";
import { AuthService } from "../auth.service";

@Injectable({
    providedIn: 'root'
})
export class UniqueUsername implements AsyncValidator{
    constructor(private authService:AuthService){}

    validate=(control: FormControl)=>{ 
        
        const {value}=control
       
        return this.authService.usernameAvailable(value).pipe(
            map(()=>{//beacuse if it gets an error dont come to map se this username is available
                return null
            }),
            // or
            // map(value => {
            //     if (value.available){
            //         return null
            //     }              
            // }),
            catchError((err=>{//catchError has to return an observable => here of as an observable emit a value
                if(err.error.username){
                    return of({unUniqueUsername: true})
                }else{
                    return of({noConnection: true})
                }
            }))
        );
    }
}