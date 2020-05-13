import { Injectable } from '@angular/core';
import { Item } from '../models/item.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { environment} from '../../environments/environment';
import { Order } from '../models/order.model';

const BACKEND_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  private items: Item[] = [];
  private UpdatedItems = new Subject<Item[]>();

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) { }

  addItem(newItem) {
    const itemData = new FormData();
    console.log(newItem.imagePath);
    itemData.append('title', newItem.title);
    itemData.append('category', newItem.category);
    itemData.append('description', newItem.description);
    itemData.append('giveAway', newItem.giveAway);
    itemData.append('image', newItem.imagePath, newItem.title);
    itemData.append('_id', null);
    itemData.append('price', newItem.price);
    itemData.append('userId', null);
    this.http.post<{message: string, item: Item}>(BACKEND_URL + 'post-items', itemData)
    .subscribe((responseData) => {
      this.items.push(responseData.item);
      this.UpdatedItems.next([...this.items]);
      this.router.navigate(['/my-items']);
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

  getItems(postsPerPage: number, currentPage: number, category: string, user: number, price: number) {
    const queryParams = `?category=${category}&price=${price}&pagesize=${postsPerPage}&page=${currentPage}&user=${user}`;
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
      itemData.append('category', item.category);
      itemData.append('description', item.description);
      itemData.append('userId', item.userId);
      itemData.append('price', item.price);
      itemData.append('giveAway', item.giveAway);
      itemData.append('image', item.imagePath, item.title);
    } else {
      itemData = item;
    }

    this.http.post<{message: string, updatedItem: Item}>(BACKEND_URL + `edit/${item._id}`, itemData)
    .subscribe((responseData) => {
      const index = this.items.findIndex(item => item._id === responseData.updatedItem._id);
      this.items[index] = responseData.updatedItem;
      this.UpdatedItems.next([...this.items]);
      this.router.navigate(['/my-items']);
    });
  }

  onItemDelete(itemId, isAdmin?) {
    this.http.delete<{message: string}>(BACKEND_URL + `delete/${itemId}`)
    .subscribe((responseData) => {
      const updatedItems = this.items.filter(item => item._id !== itemId);
      this.items = updatedItems;
      this.UpdatedItems.next([...this.items]);
      if (isAdmin) {
        this.router.navigate(['admin/items-list']);
      } else {
        this.router.navigate(['/item-list']);
      }
    });
  }

}
