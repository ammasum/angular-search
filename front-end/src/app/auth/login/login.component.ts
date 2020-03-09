import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../_service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService) { }

  showPassword = false;
  validationFaild = false;

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  ngOnInit(): void {
  }

  onLogin() {
    this.authService.login(this.loginForm.value)
      .subscribe((data: serverResponse) => {
        if(!data.status) {
          this.validationFaild = true;
          return;
        }
      });
  }

}

interface serverResponse {
  status: boolean;
  message: string;
  token: string;
}
