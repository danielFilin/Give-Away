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

  constructor(private itemsService: ItemsService) { }

  ngOnInit(): void {
    this.itemsService.getFavorites();
    this.itemsService.getFavoritesListener().subscribe((favorites) => {
      console.log(favorites);
      this.favorites = favorites;
    });
  }

  ngOnDestroy() {
    this.favoritesSubscription.unsubscribe();
  }

}
