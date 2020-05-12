import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminService } from '../admin.service';
import { mimeType} from '../../items/item-create/mime-type.validator';
import { Category } from 'src/app/models/category.model';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent implements OnInit {
  categoryCreateForm: FormGroup;
  imagePreview: string;
  editMode = false;
  editedCategoryId: string;


  constructor(private adminService: AdminService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.categoryCreateForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      routerLink: new FormControl(null, [Validators.required]),
      image: new FormControl(null, { validators: [Validators.required], asyncValidators: [mimeType]})
    });

    this.route.paramMap.subscribe( (paramMap: ParamMap) => {
      const categoryId = paramMap.get('id');
      if (categoryId) {
        this.editMode = true;
        this.adminService.getSingleCategory(categoryId).subscribe((fetchedCategory) => {
          this.editedCategoryId = fetchedCategory.categoryList._id;

          this.categoryCreateForm.setValue({
            name: fetchedCategory.categoryList.name,
            image: fetchedCategory.categoryList.imagePath,
            routerLink: fetchedCategory.categoryList.routerLink
          });
        });
      }
    });
  }

  onSaveCategory() {
    if (this.categoryCreateForm.invalid) {
      console.log('error')
      return;
    }

    if (!this.editMode) {
      const category: Category = {
        name: this.categoryCreateForm.value.name,
        imagePath: this.categoryCreateForm.value.image,
        routerLink: this.categoryCreateForm.value.routerLink,
        _id: null
      };
      this.adminService.addCategory(category);
    } else {
      const category: Category = {
        name: this.categoryCreateForm.value.name,
        imagePath: this.categoryCreateForm.value.image,
        routerLink: this.categoryCreateForm.value.routerLink,
        _id: this.editedCategoryId
      };
      this.adminService.editCategory(category);
    }

  }

  onImagePicked(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.categoryCreateForm.patchValue({ image: file});
    this.categoryCreateForm.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = (reader.result as string);
    };
    reader.readAsDataURL(file);
  }

}
