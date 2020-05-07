import { Component, OnInit, Renderer2 } from '@angular/core';
import { ItemsService } from '../items.service';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/admin/admin.service';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  categoriesList: Category[] = [];
  categoriesEqual: Category[] = [];
  categoriesUnequal: Category[] = [];
  isFree = 0;
  isEntered = false;
  categoriesSubscription: Subscription;
  constructor(private route: Router, private adminService: AdminService, private renderer: Renderer2) { }


  ngOnInit(): void {
    this.adminService.getCategories();
    this.categoriesSubscription = this.adminService.getCategoriesUpdateListener().subscribe( (categories: Category[]) => {
    this.categoriesList = categories;
    for (let i = 0; i < this.categoriesList.length; i++) {
      if (i % 2 === 0) {
        this.categoriesEqual.push(this.categoriesList[i]);
      } else {
        this.categoriesUnequal.push(this.categoriesList[i]);
      }
    }
    });
  }

  toggleClass(event: any) {
    const hasClass = event.target.classList.contains('chosen');

    if (hasClass) {
      this.renderer.removeClass(event.target, 'chosen');
    } else {
      this.renderer.addClass(event.target, 'chosen');
    }
  }

  searchItems(query) {
    this.route.navigate(['../item-list', {category: query.value, price: this.isFree}]);
  }

  isChecked() {
    this.isFree === 0 ? this.isFree = 1 : this.isFree = 0;
  }


}
