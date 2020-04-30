import { Injectable } from '@angular/core';
import { Item } from '../models/item.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment} from '../../environments/environment';
import { Order } from '../models/order.model';

const BACKEND_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  private items: Item[] = [];
  private userCart: Item[] = [];
  private orders: Order[] = [];
  private UpdatedItems = new Subject<Item[]>();
  private updatedCart = new Subject<Item[]>();
  private updatedOrdersList = new Subject<Order>();
  private updatedFavorites = new Subject<Item[]>();

  constructor(private http: HttpClient, private router: Router, ) { }

  addItem(newItem) {
    const itemData = new FormData();
    itemData.append('title', newItem.title);
    itemData.append('description', newItem.description);
    itemData.append('image', newItem.imagePath, newItem.title);
    itemData.append('_id', null);
    itemData.append('userId', null);

    this.http.post<{message: string, item: Item}>(BACKEND_URL + 'post-items', itemData)
    .subscribe((responseData) => {
      this.items.push(responseData.item);
      this.UpdatedItems.next([...this.items]);
      this.router.navigate(['/item-list']);
    });
  }

  getAllItems() {
    return this.items;
  }

  getItemsUpdateListener() {
    return this.UpdatedItems.asObservable();
  }

  getSingleItem(id) {
    return this.http.get<{message: string, items: Item, creator: object}>(BACKEND_URL + `items/${id}`);
  }

  getCartUpdateListener() {
    return this.updatedCart.asObservable();
  }

  getOrdersUpdateListener() {
    return this.updatedOrdersList.asObservable();
  }

  getFavoritesListener() {
    return this.updatedFavorites.asObservable();
  }

  getItems(postsPerPage: number, currentPage: number, user: number) {
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}&user=${user}`;
    this.http.get<{message: string, items: Item[]}>(BACKEND_URL + `items${queryParams}`)
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
      this.updatedCart.next();
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
      this.updatedCart.next([...this.userCart]);
    });
  }

  makeOrder() {
    this.http.get<{message: string, order: Order}>(BACKEND_URL + `orders`)
    .subscribe((itemData) => {
      this.updatedOrdersList.next(itemData.order);
      this.router.navigate(['/item-list']);

    });
  }

  getOrders() {
    this.http.get<{message: string, orders: Order}>(BACKEND_URL + `get-orders`)
    .subscribe((itemData) => {
      this.updatedOrdersList.next(itemData.orders);
    });
  }

  getCurrentOrders() {
    return this.orders;
  }

  onAddToFavorites(itemId) {
    const favoriteItemId = {id: itemId};
    this.http.post<{message: string}>(BACKEND_URL + `favorites`, favoriteItemId)
    .subscribe((responseData) => {
      this.updatedFavorites.next();
    });
  }

  getFavorites() {
    this.http.get<{message: string, items: { items: Item[]}}>(BACKEND_URL + `favorites`)
    .subscribe((responseData) => {
      this.updatedFavorites.next(responseData.items.items);
    });
  }

  removeFromFavorites(itemId) {
    this.http.delete<{message: string,  updatedFavorites: { items: Item[]}}>(BACKEND_URL + `delete-from-favorites/${itemId}`)
    .subscribe((responseData) => {
      this.updatedFavorites.next(responseData.updatedFavorites.items);
    });
  }

}
