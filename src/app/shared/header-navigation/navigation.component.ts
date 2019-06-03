import { Component, AfterViewInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbPanelChangeEvent, NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

declare var $: any;
@Component({
  selector: 'ap-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent implements AfterViewInit {
    isLoggedIn: boolean;
    loggedInUser: string;
	name:string;
  	constructor(
          private modalService: NgbModal,
          private authService: AuthService,
          private router: Router
        ) {
    	
    }

    ngOnInit() {
        this.authService.getAuth().subscribe(auth => {
          if(auth){
            this.isLoggedIn = true;
            this.loggedInUser = auth.email;
          } else{
            this.isLoggedIn = false;
          }
        });
      }
      
    ngAfterViewInit() {
        
        var set = function() {
            var width = (window.innerWidth > 0) ? window.innerWidth : this.screen.width;
            var topOffset = 0;
            if (width < 1170) {
                $("#main-wrapper").addClass("mini-sidebar");
            } else {
                $("#main-wrapper").removeClass("mini-sidebar");
            }
        };
        $(window).ready(set);
        $(window).on("resize", set);
     
        
        $("body").trigger("resize");
    }

    onLogoutClick(){
        this.authService.logout();
        this.router.navigate(['/login']);
      };
}
