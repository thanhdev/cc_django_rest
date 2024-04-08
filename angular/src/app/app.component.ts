import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HttpClient} from "@angular/common/http";
import { environment } from './../environments/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'first-angular';
  name = '';
  userCount = 0;

  constructor(private http: HttpClient) {
    this.fetchData();
    console.log(environment.apiUrl)
  }

  fetchData() {
    this.http.get<any>('/api/users/me/').subscribe(data => {
      this.name = data.name;
    });

    let listUrl = '/api/users/';
    this.http.get<any>(listUrl).subscribe(data => {
      this.userCount = data.length;
    });
  }

}
