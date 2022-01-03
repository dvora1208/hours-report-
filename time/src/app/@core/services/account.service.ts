import { Injectable } from '@angular/core';
import { UserService } from '.';
import { UserLogin } from '../models';


@Injectable({ providedIn: 'root' })
export class AccountService {
    
  constructor (
    private userService: UserService
  ) {}


    isUserAvalid(obj: UserLogin): boolean {
        if((obj.username == 'dvora' && obj.password == "123456")){
            this.userService.saveUser(obj);
            return true;
        }
        return false;
    }
}