import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../items.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Item } from 'src/app/models/item.model';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit {
  item: Item;
  constructor(private itemsService: ItemsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe( (paramMap: ParamMap) => {
      const itemId = paramMap.get('itemId');
      this.itemsService.getSingleItem(itemId).subscribe( data => {
        this.item = {
          _id: data.items._id,
          description: data.items.description,
          imagePath: data.items.imagePath,
          title: data.items.title,
          userId: data.items.userId
        };
      });
    });
  }
}
