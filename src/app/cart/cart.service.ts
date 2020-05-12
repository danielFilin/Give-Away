import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Item } from '../models/item.model';
import { HttpClient } from '@angular/common/http';
import { environment} from '../../environments/environment';
import { Order } from '../models/order.model';
import { Router } from '@angular/router';

const BACKEND_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private orders: Order[] = [];
  private userCart: Item[] = [];
  // private UpdatedItems = new Subject<Item[]>();
  private updatedOrdersList = new Subject<Order>();
  private updatedFavorites = new Subject<Item[]>();
  private updatedCart = new Subject<Item[]>();
  private updatedCartLength = new Subject<number>();

  constructor(private http: HttpClient, private router: Router) { }

  getCartUpdateListener() {
    return this.updatedCart.asObservable();
  }

  getCartLengthListener() {
    return this.updatedCartLength.asObservable();
  }

  getOrdersUpdateListener() {
    return this.updatedOrdersList.asObservable();
  }

  getFavoritesListener() {
    return this.updatedFavorites.asObservable();
  }

  onAddToCart(itemId) {
    this.http.post<{message: string}>(BACKEND_URL + `cart/${itemId}`, itemId)
    .subscribe((responseData) => {
      this.updatedCart.next();

      this.updatedCartLength.next(this.userCart.length + 1);
    });
  }

  getUserCart() {
    this.http.get<{message: string, cartItems: Item[]}>(BACKEND_URL + `user-cart`)
    .subscribe((itemData) => {
      this.userCart = (itemData.cartItems);
      this.updatedCart.next([...this.userCart]);
      this.updatedCartLength.next(this.userCart.length);
    });
  }

  deleteItemFromCart(itemId) {
    this.http.delete<{message: string, updatedCart: Item[]}>(BACKEND_URL + `delete-from-cart/${itemId}`)
    .subscribe((responseData) => {
      this.userCart = responseData.updatedCart;
      this.updatedCart.next([...this.userCart]);
      this.updatedCartLength.next(this.userCart.length);
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


