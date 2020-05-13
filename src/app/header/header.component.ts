import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private authListener: Subscription;
  private adminListener: Subscription;
  private cartItemsListener: Subscription;
  isUserAuthenticated = false;
  isUserAdmin = false;
  favoriteItemsNumber: number;

  constructor(private authService: AuthService, private cartService: CartService) { }

  ngOnInit(): void {
    this.isUserAuthenticated = this.authService.getIsAuthenticated();
    this.authListener = this.authService.getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.isUserAuthenticated = isAuthenticated;
    });
    this.isUserAdmin = this.authService.getIsAdmin();
    this.adminListener = this.authService.getAdminStatusListener()
    .subscribe(isAdmin => {
      this.isUserAdmin = isAdmin;
    });

    // throws an error on init, but I am not sure it really provides the cart items
   // this.cartService.getUserCart();

    this.cartItemsListener = this.cartService.getCartLengthListener()
    .subscribe( itemsLength => {
      this.favoriteItemsNumber = itemsLength;
    });

  }

  onLogout() {
    this.authService.onUserLogout();
  }

  ngOnDestroy() {
    this.authListener.unsubscribe();
    this.adminListener.unsubscribe();
    this.cartItemsListener.unsubscribe();
  }

}
