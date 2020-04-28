import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../items.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(private itemsService: ItemsService) { }

  ngOnInit(): void {
  }

  configureView(form) {
    this.itemsService.getItems(form.value.itemsPerPage, form.value.startingPage, 0);
  }

}
