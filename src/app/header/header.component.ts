import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  private authListenerSub: Subscription;

  constructor(private authServ: AuthService) {}

  ngOnInit(): void {
    this.authListenerSub = this.authServ
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {

        this.userIsAuthenticated = isAuthenticated;
      });
  }

  ngOnDestroy(): void {
    this.authListenerSub.unsubscribe();
  }

  onLogout(){
    this.authServ.logoutUser();
  }
}
