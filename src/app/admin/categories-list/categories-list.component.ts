import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdminService } from '../admin.service';
import { Category } from 'src/app/models/category.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements OnInit, OnDestroy {
  categoriesList: Category[] = [];
  categoriesSubscription: Subscription;
  constructor(private adminService: AdminService, private router: Router) { }

  ngOnInit(): void {
    this.adminService.getCategories();
    this.categoriesSubscription = this.adminService.getCategoriesUpdateListener().subscribe( (categories: Category[]) => {
      this.categoriesList = categories;
    });
    }

  onCategoryDelete(categoryId) {
    this.adminService.deleteCategory(categoryId);
  }

  onCategoryEdit(categoryId) {
    this.router.navigate([`/admin/edit/${categoryId}`]);
  }

  ngOnDestroy() {
    this.categoriesSubscription.unsubscribe();
  }

}
