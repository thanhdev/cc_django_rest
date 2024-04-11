import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HttpClient} from "@angular/common/http";
import { environment } from '../environments/environment';
import {getCookie} from "./utils";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'first-angular';
  name = '';
  newName = '';
  userCount = 0;

  constructor(private http: HttpClient) {
    this.loadUserInfo();
  }

  loadUserInfo() {
    const options = { withCredentials: true };

    this.http.get<any>(environment.apiUrl + '/users/me/', options).subscribe(data => {
      this.name = data.name;
    });

    let listUrl = environment.apiUrl + '/users/';
    this.http.get<any>(listUrl).subscribe(data => {
      this.userCount = data.length;
    });
  }

  updateUserName() {
    const csrfToken = getCookie('csrftoken') || '';
    const options = { withCredentials: true, headers: { 'X-CSRFToken': csrfToken } };

    this.http.patch<any>(environment.apiUrl + '/users/root/', { name: this.newName }, options).subscribe(() => {
      this.loadUserInfo()
    });
  }

}
