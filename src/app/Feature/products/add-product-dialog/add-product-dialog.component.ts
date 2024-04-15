import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductsService } from '../../../Core/services/products.service';
import { FormControl, FormGroup, FormGroupDirective, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ErrorStateMatcher } from '@angular/material/core';
import { CommonModule } from '@angular/common';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-add-product-dialog',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule , CommonModule],
  templateUrl: './add-product-dialog.component.html',
  styleUrl: './add-product-dialog.component.scss'
})
export class AddProductDialogComponent {
  matcher = new MyErrorStateMatcher()
  editMoode: boolean = false;
  productToEditId:number =0

  addProductForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required, Validators.min(1)]),
    description: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required])

  })


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddProductDialogComponent>,
    private productsService: ProductsService
  ) {
    if (this.data) {
      this.editMoode = true
      this.productToEditId = this.data.id
      let temp ={
        title: this.data.title,
        price: this.data.price,
        description: this.data.description,
        category: this.data.category,
        image: this.data.image
      }
      this.addProductForm.setValue(temp) 
    }

  }


  addProduct() {
    if(this.editMoode){
      let productData = this.addProductForm.value;
      this.productsService.updateProduct(productData , this.productToEditId).subscribe({
        next: (res) => {
          console.log('res: ', res);
         this.closeDialog(res)
  
        }
      })
    }else{
      let productData = this.addProductForm.value;
      this.productsService.addProduct(productData).subscribe({
        next: (res) => {
          console.log('res: ', res);
          this.closeDialog(res)
  
        }
      })
    }
 
  }




  cancel() {
    this.closeDialog()
  }
  closeDialog(data?: any) {
    if (data) {

      this.dialogRef.close(data);
    }
    else {
      this.dialogRef.close();
    }
  }
}
