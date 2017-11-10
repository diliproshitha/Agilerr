import { Injectable } from '@angular/core';
import {isNullOrUndefined, isUndefined} from "util";

@Injectable()
export class ValidateService {

  constructor() { }

  validateRegister(user){
    if (isNullOrUndefined(user.name) || isNullOrUndefined(user.username) || isNullOrUndefined(user.email) || isNullOrUndefined(user.password) || isNullOrUndefined(user.type)){
      return false;
    } else {
      return true;
    }
  }

  validateEmail(email){
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

}
