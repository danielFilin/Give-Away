import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Category } from '../models/category.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { Item } from '../models/item.model';

const BACKEND_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private updatedCategories = new Subject<Category[]>();
  listOfCategories: Category[] = [];
  users: User[] = [];
  private updatedUsersList = new Subject<User[]>();
  itemsList: Item[] = [];
  private updatedItemsList = new Subject<Item[]>();

  constructor(private http: HttpClient, private router: Router) { }

  getCategoriesUpdateListener() {
    return this.updatedCategories.asObservable();
  }

  getUpdatedUsersList() {
    return this.updatedUsersList.asObservable();
  }

  getItemsList() {
    return this.updatedItemsList.asObservable();
  }

  getCategories() {
    this.http.get<{message: string, categoryList: Category[]}>(BACKEND_URL + `admin/post-categories`)
    .subscribe((responseData) => {
      this.listOfCategories = responseData.categoryList;
      this.updatedCategories.next([...this.listOfCategories]);
    });
  }

  getSingleCategory(categoryId) {
    return this.http.get<{message: string, categoryList: Category}>(BACKEND_URL + `admin/categories/${categoryId}`);
  }

  addCategory(category) {
    const categoryData = new FormData();
    categoryData.append('name', category.name);
    categoryData.append('_id', null);
    categoryData.append('routerLink', category.routerLink);
    categoryData.append('image', category.imagePath, category.name);
    this.http.post<{message: string, category: Category}>(BACKEND_URL + `admin/post-categories`, categoryData)
      .subscribe((responseData) => {
        this.router.navigate(['/admin/categories-list']);
      });
  }

  deleteCategory(categoryId) {
    this.http.delete<{message: string}>(BACKEND_URL + `admin/delete-category/${categoryId}`)
    .subscribe(() => {
      const updatedCategories = this.listOfCategories.filter(category => category._id !== categoryId);
      this.listOfCategories = updatedCategories;
      this.updatedCategories.next([...this.listOfCategories]);
      this.router.navigate(['/admin/categories-list']);
    });
  }

  editCategory(category) {
    let categoryData;
    if (typeof(category.imagePath) === 'object') {
      categoryData = new FormData();
      categoryData.append('title', category.name);
      categoryData.append('_id', category._id);
      categoryData.append('routerLink', category.routerLink);
      categoryData.append('image', category.imagePath, category.title);
    } else {
      categoryData = category;
    }
    this.http.put<{message: string}>(BACKEND_URL + `admin/edit-category/${category._id}`, categoryData)
    .subscribe((editedCategory) => {
      this.router.navigate(['/admin/categories-list']);
    });
  }

  getUsers() {
    this.http.get<{message: string, users: User[]}>(BACKEND_URL + 'admin/get-users').subscribe( (userData) => {
      this.users = userData.users;
      this.updatedUsersList.next([...this.users]);
    });
  }

  deleteUser(userId) {
    this.http.delete<{message: string, userId: string}>(BACKEND_URL + `admin/delete-user/${userId}`).subscribe( (userData) => {
      const updatedUsers = this.users.filter(user => user._id !== userData.userId);
      this.users = [...updatedUsers];
      this.updatedUsersList.next([...this.users]);
    });
  }

  getAllItems() {
    this.http.get<{message: string, items: Item[]}>(BACKEND_URL + 'admin/get-items').subscribe( (itemsData) => {
      this.itemsList = itemsData.items;
      this.updatedItemsList.next([...this.itemsList]);
    });
  }
}
