import { Component, OnInit, OnDestroy } from '@angular/core';
import { ItemsService } from 'src/app/items/items.service';
import { Item } from 'src/app/models/item.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-my-favorites',
  templateUrl: './my-favorites.component.html',
  styleUrls: ['./my-favorites.component.css']
})
export class MyFavoritesComponent implements OnInit, OnDestroy {
  favorites: Item[] = [];
  favoritesSubscription: Subscription;
  isLoading = false;

  constructor(private itemsService: ItemsService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.itemsService.getFavorites();
    this.favoritesSubscription = this.itemsService.getFavoritesListener().subscribe((favorites) => {
      this.favorites = favorites;
      this.isLoading = false;
    });
  }

  onFavoriteRemove(itemId) {
    this.itemsService.removeFromFavorites(itemId);
    this.isLoading = true;
  }

  ngOnDestroy() {
    this.favoritesSubscription.unsubscribe();
  }

}
