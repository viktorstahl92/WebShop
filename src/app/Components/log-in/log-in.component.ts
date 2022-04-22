import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserInfo } from 'src/app/models/user-info';
import { AuthService } from 'src/services/auth.service';
import { TokenStorageService } from 'src/services/token-storage.service';
@Component({
  selector: 'app-login',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LoginComponent implements OnInit {
  form: any = {
    username: "",
    password: ""
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  user?: UserInfo;
  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private route: Router) { }
  ngOnInit(): void {

    this.checkToken();
  }
  onSubmit(): void {
    const { username, password } = this.form;
    this.authService.login(username, password).subscribe(data => {
      this.tokenStorage.saveToken(data);
      this.isLoggedIn = true;
      this.checkToken();
    },
      err => {
        this.errorMessage = err.error;
      });

  }

  checkToken() {
    if (this.tokenStorage.getToken()) {
      this.route.navigate(['/', 'main']);

    }
  }
}

