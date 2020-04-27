import { Component, OnInit, OnDestroy } from '@angular/core';
import { ItemsService } from 'src/app/items/items.service';
import { Subscription } from 'rxjs';
import { Item } from 'src/app/models/item.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {
  cartItems;
  cartSubscription: Subscription;

  constructor(private itemsService: ItemsService) { }

  ngOnInit(): void {
    this.itemsService.getUserCart();
    this.cartSubscription = this.itemsService.getCartUpdateListener().subscribe((items: Item[]) => {
      this.cartItems = items;
    });
  }

  onItemDelete(itemId) {
    this.itemsService.deleteItemFromCart(itemId);
  }

  orderItems() {
    this.itemsService.makeOrder();
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
  }

}
