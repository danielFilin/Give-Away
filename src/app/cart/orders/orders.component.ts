import { Component, OnInit, OnDestroy } from '@angular/core';
import { ItemsService } from 'src/app/items/items.service';
import { Subscription } from 'rxjs';
import { Order } from 'src/app/models/order.model';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit, OnDestroy {
  ordersSubscription: Subscription;
  customerOrders: Order;
  constructor(private itemsService: ItemsService) { }

  ngOnInit(): void {
    // this.customerOrders = this.itemsService.getCurrentOrders();
    this.itemsService.getOrders();

    this.ordersSubscription = this.itemsService.getOrdersUpdateListener().subscribe( (orders: Order) => {
      console.log(orders);
      this.customerOrders = orders;
    });
  }

  ngOnDestroy() {
    this.ordersSubscription.unsubscribe();
  }

}
