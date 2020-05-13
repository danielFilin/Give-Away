import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdminService } from '../admin.service';
import { Item } from 'src/app/models/item.model';
import { Subscription } from 'rxjs';
import { ItemsService } from 'src/app/items/items.service';

@Component({
  selector: 'app-all-items',
  templateUrl: './all-items.component.html',
  styleUrls: ['./all-items.component.css']
})
export class AllItemsComponent implements OnInit, OnDestroy {
  itemsList: Item[] = [];
  itemsSubscription: Subscription;
  onDeleteItemSubscription: Subscription;


  constructor(private adminService: AdminService, private itemsService: ItemsService) { }

  ngOnInit(): void {
    this.adminService.getAllItems();
    this.itemsSubscription = this.adminService.getItemsList().subscribe( (itemsData) => {
      this.itemsList = itemsData;
    });

    this.onDeleteItemSubscription = this.itemsService.getItemsUpdateListener().subscribe( (items) => {
      this.itemsList = items;
    })

  }

  deleteItem(itemId) {
    this.itemsService.onItemDelete(itemId, true);
  }

  ngOnDestroy() {
    this.itemsSubscription.unsubscribe();
    this.onDeleteItemSubscription.unsubscribe();
  }

}
