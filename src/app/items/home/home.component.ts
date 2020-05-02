import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../items.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  constructor(private itemsService: ItemsService) { }


  ngOnInit(): void {
  }

  navigateToCategory(categoryName) {
    this.itemsService.getItemsByCategory(categoryName);
  }


}
