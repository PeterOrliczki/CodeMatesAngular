import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  username: string = 'username';
  password: string = 'password';
  email: string = 'email';
  location: string = 'location';
  address: string = 'address';

  constructor(
    private http: HttpClient,
    private cookie: CookieService
  ) { }

  ngOnInit() {
    let url = environment.apiUrl + '/profile';
    this.http.post<any>(url, {
      token: this.cookie.get('token')
    }).subscribe(res => this.onResponseReceived(res),
      error => this.handleError(error)); {
    };
  }

  handleError(error: any): void {
    console.log(error);

  }

  onResponseReceived(res) {
    this.username = res.name;
    this.password = res.password;
    this.email = res.email;
    this.location = res.location;
    this.address = res.address;

  }

  onUpdateClicked() {
    let url = environment.apiUrl + '/profile';
    this.http.put<any>(url, {
      name : this.username,
      password : this.password,
      email : this.email,
      location : this.location,
      address : this.address
    }).subscribe(res => this.onProfileUpdateResponse(res),
      error => this.handleError(error)); {
    };
    

  }
  onProfileUpdateResponse(res: any): void {
    console.log('okcs');
  }

}
