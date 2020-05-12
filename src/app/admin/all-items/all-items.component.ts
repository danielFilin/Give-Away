import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdminService } from '../admin.service';
import { Item } from 'src/app/models/item.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-all-items',
  templateUrl: './all-items.component.html',
  styleUrls: ['./all-items.component.css']
})
export class AllItemsComponent implements OnInit, OnDestroy {
  itemsList: Item[] = [];
  itemsSubscription: Subscription;


  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.adminService.getAllItems();
    this.itemsSubscription = this.adminService.getItemsList().subscribe( (itemsData) => {
      this.itemsList = itemsData;
    });
  }

  deleteItem(itemId) {
    
  }

  ngOnDestroy() {
    this.itemsSubscription.unsubscribe();
  }

}
