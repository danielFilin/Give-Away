import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Item } from '../../models/item.model';
import { ItemsService } from '../items.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { mimeType} from './mime-type.validator';

@Component({
  selector: 'app-item-create',
  templateUrl: './item-create.component.html',
  styleUrls: ['./item-create.component.css']
})
export class ItemCreateComponent implements OnInit {
  itemCreateForm: FormGroup;
  editMode = false;
  newItem: Item;
  imagePreview: string;
  showPrice = false;


  constructor(private itemsService: ItemsService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    this.itemCreateForm = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      description: new FormControl(null, Validators.required),
      category: new FormControl(null, Validators.required),
      giveAway: new FormControl(true, Validators.required),
      price: new FormControl(null),
      image: new FormControl(null, { validators: [Validators.required], asyncValidators: [mimeType]})
    });

    this.route.paramMap.subscribe( (paramMap: ParamMap) => {
      const itemId = paramMap.get('itemId');
      if (itemId) {
        this.editMode = true;
        this.itemsService.getSingleItem(itemId).subscribe( data => {
          this.newItem = {
            _id: data.items._id,
            description: data.items.description,
            imagePath: data.items.imagePath,
            title: data.items.title,
            category: data.items.category,
            userId: data.items.userId,
            giveAway: data.items.giveAway,
            price: data.items.price
          };
          this.itemCreateForm.setValue({
            title: data.items.title,
            description: data.items.description,
            image: data.items.imagePath,
            category: data.items.category,
            giveAway: data.items.giveAway,
            price: data.items.price
          });
        });
      }
    });
  }

  onImagePicked(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.itemCreateForm.patchValue({ image: file});
    this.itemCreateForm.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = (reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  togglePriceView() {
  if (this.itemCreateForm.value.giveAway) {
    this.showPrice = false;
  } else {
    this.showPrice = true;
  }
}

  onSaveItem() {

    if (this.itemCreateForm.invalid) {
    return;
    }

    if (!this.editMode) {
      const item: Item = {
        title: this.itemCreateForm.value.title,
        description: this.itemCreateForm.value.description,
        imagePath: this.itemCreateForm.value.image,
        category: this.itemCreateForm.value.category,
        giveAway: this.itemCreateForm.value.giveAway,
        price: this.itemCreateForm.value.price,
        _id: null,
        userId: null
      };
      this.itemsService.addItem(item);
    } else {
      console.log(this.itemCreateForm.value.image);
      const item: Item = {
        title: this.itemCreateForm.value.title,
        description: this.itemCreateForm.value.description,
        imagePath: this.itemCreateForm.value.image,
        category: this.itemCreateForm.value.category,
        giveAway: this.itemCreateForm.value.giveAway,
        price: this.itemCreateForm.value.price,
        _id: this.newItem._id,
        userId: this.newItem.userId
      };
      this.itemsService.editItem(item);
    }
    }
  }



