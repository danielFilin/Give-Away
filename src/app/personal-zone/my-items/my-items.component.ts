import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/models/item.model';
import { ItemsService } from 'src/app/items/items.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-my-items',
  templateUrl: './my-items.component.html',
  styleUrls: ['./my-items.component.css']
})
export class MyItemsComponent implements OnInit {
  items: Item[] = [];
  isLoading = true;
  itemsSubscription: Subscription;
  userId: string;
  constructor(private itemsService: ItemsService, private authService: AuthService) { }

  ngOnInit(): void {
    this.itemsService.getItems(25, 1, null, 1, 0);
    this.userId = this.authService.getUserId();
    this.itemsSubscription = this.itemsService.getItemsUpdateListener().subscribe((items: Item[]) => {
      const itemsCreatedByCurrentUser = items.filter( (item) => {
        return item.userId === this.userId;
      });
      this.items = itemsCreatedByCurrentUser;
      this.isLoading = false;
    });
  }

  deleteItem(itemId){
    this.itemsService.onDelete(itemId);
  }

}
