import { Component, OnInit, OnDestroy } from '@angular/core';
import { ItemsService } from 'src/app/items/items.service';
import { Item } from 'src/app/models/item.model';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/cart/cart.service';

@Component({
  selector: 'app-my-favorites',
  templateUrl: './my-favorites.component.html',
  styleUrls: ['./my-favorites.component.css']
})
export class MyFavoritesComponent implements OnInit, OnDestroy {
  favorites: Item[] = [];
  favoritesSubscription: Subscription;
  isLoading = false;

  constructor(private itemsService: ItemsService, private cartService: CartService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.cartService.getFavorites();
    this.favoritesSubscription = this.cartService.getFavoritesListener().subscribe((favorites) => {
      console.log(favorites);
      this.favorites = favorites;
      this.isLoading = false;
    });
  }

  onFavoriteRemove(itemId) {
    this.cartService.removeFromFavorites(itemId);
    this.isLoading = true;
  }

  onAddToCart(itemId) {
    this.cartService.onAddToCart(itemId);
  }

  ngOnDestroy() {
    this.favoritesSubscription.unsubscribe();
  }

}
