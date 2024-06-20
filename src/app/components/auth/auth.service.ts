import { Injectable } from '@angular/core';
import { IRegisterUser } from '../../shared/interfaces/i-register-user';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  register(formValues: IRegisterUser) {
    let registerUrl = environment.apiUrl + 'users';

    return this.http.post(registerUrl, formValues);
  }
}
