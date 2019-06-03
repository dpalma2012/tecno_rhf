import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import {MessageService}  from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit() {

  }

  onSubmit(){
    this.authService.login(this.email, this.password)
    .then((res) => {
      this.messageService.add({severity:'info', summary:'Success', detail:'You are logged in'});
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 1500);
      
    })
    .catch((err) => {
      this.messageService.add({severity:'error', summary:'Error', detail:err.message});
      this.router.navigate(['/login']);
    })
  }


}
