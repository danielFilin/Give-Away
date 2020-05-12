import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Item } from 'src/app/models/item.model';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {
  cartItems;
  cartSubscription: Subscription;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.getUserCart();
    this.cartSubscription = this.cartService.getCartUpdateListener().subscribe((items: Item[]) => {
      this.cartItems = items;
    });
    console.log(this.cartItems);
  }

  onItemDelete(itemId) {
    this.cartService.deleteItemFromCart(itemId);
  }

  orderItems() {
    this.cartService.makeOrder();
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
  }

}
