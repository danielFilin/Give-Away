import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Category } from '../models/category.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

const BACKEND_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private updatedCategories = new Subject<Category[]>();
  listOfCategories: Category[] = [];

  constructor(private http: HttpClient, private router: Router) { }

  getCategoriesUpdateListener() {
    return this.updatedCategories.asObservable();
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

}
