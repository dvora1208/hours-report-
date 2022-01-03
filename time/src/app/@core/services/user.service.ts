import { Injectable } from '@angular/core';
import { UserLogin } from '../models';


@Injectable({ providedIn: 'root' })
export class UserService {

  getUser() {
    let result = sessionStorage.getItem('user');
    if (result) {
      return JSON.parse(result);
    }
  }

  saveUser(user: UserLogin) {
    sessionStorage.setItem('user', JSON.stringify(user));
  }
}