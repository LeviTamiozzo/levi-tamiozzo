import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url = '/';

  constructor(public httpClient: HttpClient) {}

  register(body: Object): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient.post(this.url.concat('register'), body).subscribe(
        registeredOkeyData => {
          resolve(registeredOkeyData);
        },
        errorFromApi => {
          reject(errorFromApi);
        }
      );
    });
  }

  login(body: Object): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient.post(this.url.concat('login'), body).subscribe(
        loginOkey => {
          resolve(loginOkey);
        },
        errorLogin => {
          reject(errorLogin);
        }
      );
    });
  }

  getTodos(id: string) {
    return this.httpClient.get(this.url.concat('get_todos/', id));
  }

  postTodos(body: Object) {
    this.httpClient
      .post(this.url.concat('post_todos'), body)
      .subscribe(() => console.log('Post OK!'));
  }

  updateTodos(id: string, body: Object) {
    this.httpClient
      .post(this.url.concat('update_todos/', id), body)
      .subscribe(() => console.log('Update OK!'));
  }

  sendEmail(emailContent) {
    return this.httpClient.post(this.url.concat('send-email'), emailContent);
  }
}
