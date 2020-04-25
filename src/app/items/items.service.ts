import { Injectable } from '@angular/core';
import { Item } from '../models/item.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment} from '../../environments/environment';

const BACKEND_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  private items: Item[] = [];
  private userCart: Item[] = [];
  private UpdatedItems = new Subject<Item[]>();
  private updatedCart = new Subject<Item[]>();

  constructor(private http: HttpClient, private router: Router, ) { }

  addItem(newItem) {
    const itemData = new FormData();
    itemData.append('title', newItem.title);
    itemData.append('description', newItem.description);
    itemData.append('image', newItem.imagePath, newItem.title);
    itemData.append('_id', null);
    itemData.append('userId', null);
    // const item: Item = {_id: null, title: newItem.title, description: newItem.description, image: newItem.image, userId: null};
    // console.log(item);
    this.http.post<{message: string, item: Item}>(BACKEND_URL + 'post-items', itemData)
    .subscribe((responseData) => {
      // const item: Item = {id: responseData.item._id, title: responseData.item.title, description: responseData.item.description};
      this.items.push(responseData.item);
      this.UpdatedItems.next([...this.items]);
    });
  }

  getAllItems() {
    return this.items;
  }

  getItemsUpdateListener() {
    return this.UpdatedItems.asObservable();
  }

  getSingleItem(id) {
    return this.http.get<{message: string, items: Item}>(BACKEND_URL + `items/${id}`);
  }

  getCartUpdateListener() {
    return this.updatedCart.asObservable();
  }

  getItems() {
    this.http.get<{message: string, items: Item[]}>(BACKEND_URL + 'items')
    .subscribe((itemData) => {
      this.items = itemData.items;
      this.UpdatedItems.next([...this.items]);
    });
  }

  editItem(item) {
    let itemData;
    if (typeof(item.imagePath) === 'object') {
      itemData = new FormData();
      itemData.append('title', item.title);
      itemData.append('description', item.description);
      itemData.append('userId', item.userId);
      itemData.append('image', item.imagePath, item.title);
    } else {
      itemData = item;
    }

    this.http.post<{message: string, updatedItem: Item}>(BACKEND_URL + `edit/${item._id}`, itemData)
    .subscribe((responseData) => {
      const index = this.items.findIndex(item => item._id === responseData.updatedItem._id);
      this.items[index] = responseData.updatedItem;
      this.UpdatedItems.next([...this.items]);
      this.router.navigate(['/item-list']);
    });
  }

  onDelete(itemId) {
    this.http.delete<{message: string}>(BACKEND_URL + `delete/${itemId}`)
    .subscribe((responseData) => {
      const updatedItems = this.items.filter(item => item._id !== itemId);
      this.items = updatedItems;
      this.UpdatedItems.next([...this.items]);
      this.router.navigate(['/item-list']);
    });
  }

   onAddToCart(itemId) {
    this.http.post<{message: string}>(BACKEND_URL + `cart/${itemId}`, itemId)
    .subscribe((responseData) => {
      //this.router.navigate(['/item-list']);
    });
  }

  getUserCart() {
    this.http.get<{message: string, cartItems: Item[]}>(BACKEND_URL + `user-cart`)
    .subscribe((itemData) => {
      this.userCart = (itemData.cartItems);
      this.updatedCart.next([...this.userCart]);
    });
  }

  deleteItemFromCart(itemId) {
    this.http.delete<{message: string, updatedCart: Item[]}>(BACKEND_URL + `delete-from-cart/${itemId}`)
    .subscribe((responseData) => {
      this.userCart = responseData.updatedCart;
      console.log(this.userCart);
      this.updatedCart.next([...this.userCart]);
    });
  }

}
