import { Injectable } from "@angular/core";
import { AbstractControl, Validator } from "@angular/forms";

@Injectable({providedIn: 'root'})
export class MatchPassword implements Validator {

    validate(control: AbstractControl){
        const {password, passwordConfirmation} = control.value;

        if(password === passwordConfirmation){
            return null
        }else{
            return {passwordDontMatch: true}
        }       
    }
}
