import { Component, OnInit, OnDestroy } from '@angular/core';
import { ItemsService } from '../items.service';
import { Item } from 'src/app/models/item.model';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { ActivatedRoute, Params } from '@angular/router';

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
  totalItems = 10;
  postsPerPage = 3;
  currentPage = 1;

  constructor(public itemsService: ItemsService, private authService: AuthService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const category = this.activatedRoute.snapshot.paramMap.get('category');
    this.itemsService.getItems(this.postsPerPage, this.currentPage, category, 0);
    this.userId = this.authService.getUserId();
    this.itemsSubscription = this.itemsService.getItemsUpdateListener().subscribe((items: Item[]) => {
      if (items !== undefined) {
        // Shoud be done on the backend using correct query!
        const itemsNotCreatedByCurrentUser = items.filter( (item) => {
          return item.userId !== this.userId;
        });
        this.items = itemsNotCreatedByCurrentUser;
      }
      this.isLoading = false;
    });

    this.isAuthenticated = this.authService.getIsAuthenticated();
    this.authSubscription = this.authService.getAuthStatusListener().subscribe((authStatus) => {
      this.isAuthenticated = authStatus;
      this.userId = this.authService.getUserId();
    });
  }

  ngOnDestroy() {
    this.itemsSubscription.unsubscribe();
    this.authSubscription.unsubscribe();
  }

}
