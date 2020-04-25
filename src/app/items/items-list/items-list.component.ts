import { Component, OnInit, OnDestroy } from '@angular/core';
import { ItemsService } from '../items.service';
import { Item } from 'src/app/models/item.model';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css']
})
export class ItemsListComponent implements OnInit, OnDestroy {

  items: Item[] = [];
  itemsSubscription: Subscription;
  authSubscription: Subscription;
  isLoading = true;
  userId: string;
  isAuthenticated = false;

  constructor(public itemsService: ItemsService, private authService: AuthService) { }

  ngOnInit(): void {
    this.itemsService.getItems();
    this.userId = this.authService.getUserId();
    this.itemsSubscription = this.itemsService.getItemsUpdateListener().subscribe((items: Item[]) => {
      this.items = items;
      this.isLoading = false;
    });
    this.isAuthenticated = this.authService.getIsAuthenticated();
    this.authSubscription = this.authService.getAuthStatusListener().subscribe((authStatus) => {
      this.isAuthenticated = authStatus;
      this.userId = this.authService.getUserId();
    });
  }


  deleteItem(itemId){
    this.itemsService.onDelete(itemId);
  }

  addToCart(itemId) {
    this.itemsService.onAddToCart(itemId);
  }

  ngOnDestroy() {
    this.itemsSubscription.unsubscribe();
    this.authSubscription.unsubscribe();
  }

}
