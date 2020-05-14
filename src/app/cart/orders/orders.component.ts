import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Order } from 'src/app/models/order.model';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit, OnDestroy {
  ordersSubscription: Subscription;
  customerOrders: Order;
  isLoading = true;
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.getOrders();
    this.ordersSubscription = this.cartService.getOrdersUpdateListener().subscribe( (orders: Order) => {
      this.customerOrders = orders;
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    this.ordersSubscription.unsubscribe();
  }

}
