import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../items.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private itemsService: ItemsService, private route: Router) { }


  ngOnInit(): void {
  }

  navigateToCategory(categoryName) {
    this.itemsService.getItemsByCategory(categoryName);
  }

  searchItems(query) {
    console.log(query.value);
    this.route.navigate(['../item-list', query.value]);
  }


}
