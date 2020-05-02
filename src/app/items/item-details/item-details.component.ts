import { Component, OnInit, OnDestroy } from '@angular/core';
import { ItemsService } from '../items.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Item } from 'src/app/models/item.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit, OnDestroy {
  item: Item;
  user: object;
  isUpdating = false;
  favoritesSubscription: Subscription;
  cartUpdateSubscription: Subscription;
  btnValue: string;


  constructor(private itemsService: ItemsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe( (paramMap: ParamMap) => {
      const itemId = paramMap.get('itemId');
      this.itemsService.getSingleItem(itemId).subscribe( data => {
        console.log(data);
        this.item = {
          _id: data.items._id,
          description: data.items.description,
          category: data.items.category,
          imagePath: data.items.imagePath,
          title: data.items.title,
          userId: data.items.userId,
          giveAway: data.items.giveAway,
          price: data.items.price
        };
        this.user = data.creator['name'];
      });
    });

    this.cartUpdateSubscription = this.itemsService.getCartUpdateListener().subscribe( () => {
      this.isUpdating = false;
    });

    this.favoritesSubscription = this.itemsService.getFavoritesListener().subscribe( () => {
      this.isUpdating = false;
      this.btnValue = '';
    });
  }

  addToCart(event, itemId) {
    this.btnValue = event.srcElement.innerText;
    this.isUpdating = true;
    this.itemsService.onAddToCart(itemId);
  }

  addToFavorites(event, itemId) {
    this.isUpdating = true;
    this.btnValue = event.srcElement.innerText;
    this.itemsService.onAddToFavorites(itemId);
  }

  ngOnDestroy() {
    this.favoritesSubscription.unsubscribe();
  }
}
