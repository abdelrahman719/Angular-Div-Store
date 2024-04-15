import { Component, OnInit, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';


import {  RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ProductsService } from '../../Core/services/products.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { product, productToAdd } from '../../Core/interfaces/product';
import { MatButton } from '@angular/material/button';
import { AddProductDialogComponent } from './add-product-dialog/add-product-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import { Subscription } from 'rxjs';
import { AppState } from '../../Store/app.state';
import { Store } from '@ngrx/store';
import { addProduct, deleteProduct, editProduct, setProducts } from '../../Store/actions/prodcuts.actions ';
import { addToCart } from '../../Store/actions/cart.actions';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, TranslateModule, MatTableModule, MatPaginatorModule, MatButton , RouterModule,MatTabsModule ,MatInputModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',

})
export class ProductsComponent implements OnInit, AfterViewInit , OnDestroy {


  userType: string = ''
  displayedColumns: string[] = ['id', 'title', 'price', 'category', 'image', 'actions'];
  productsList: product[] = []
  filterMood:boolean=false;
  dataSource = new MatTableDataSource<product>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  categories:string[]=[]
  productsInCat:{category:string , products:product[]}[]=[];
  allProducts:product[]=[]

  authStoreSubcription: Subscription | null = null;
  productsStoreSubcription: Subscription | null = null;
  constructor(
    private productsService: ProductsService,
    private matDialog: MatDialog,
    private store: Store<AppState>,
  ) {

  }


  ngOnInit(): void {
    this.uiConfig()
 
   
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  uiConfig() {
    this.authStoreSubcription = this.store.select('auth').subscribe((authData) => {
      this.userType = authData.user?.role!;
      if(this.userType =='admin'){
        this.getProducts()
        this.store.select('products').subscribe((products)=>{
          let productsList = products['products']
          if(productsList){
            this.dataSource = new MatTableDataSource<product>(productsList);
            this.dataSource.paginator = this.paginator;
          }
        })
      }
      if (this.userType =='user') {
       
        this.getCategories()
      } 

    });
  }

  getProducts() {
    this.productsService.getProducts().subscribe({
      next: (res: product[]) => {
        
        this.productsList = res
        this.store.dispatch(new setProducts(this.productsList))
      }
    })
  }

  // actions by admin
  openAddProductDialog() {
    const dialogRef = this.matDialog.open(AddProductDialogComponent, {
      width: '600px',
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.store.dispatch(new addProduct(result))
      }

    });

  }
  openEditProductDialog(product: productToAdd) {
    const dialogRef = this.matDialog.open(AddProductDialogComponent, {
      data: product,
      width: '600px',
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.store.dispatch(new editProduct(result))
      }

    });

  }
  deleteProduct(id: number) {
    
    this.productsService.deleteProduct(id).subscribe({
      next: (res) => {
        console.log('this.productsList: ', this.productsList);
        if (res) {
          this.store.dispatch(new deleteProduct(res))
        }
      }
    })
  }
  //actions by user

  getCategories(){
    this.productsService.getCategories().subscribe({
      next:(res)=>{
        console.log('res: ', res);
        this.categories= res
        this.categories.forEach(cat=>{
          this.productsService.getProductsInCategories(cat).subscribe({
          next:(res)=>{
            this.allProducts =[...this.allProducts , ...res]

            this.productsInCat.push({category:cat , products:res})
          }
         })
  

        })
        

      }
    })
  }
  getProductsInCategories(categId:string){
   this.productsService.getProductsInCategories(categId)
  }
  addToCart(product:product){
    
  this.store.dispatch(new addToCart({product:product , count:1}))
  }


  filterProducts(event: Event) {
    this.filterMood = true
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    if(filterValue =='' || filterValue == null)
      {
        this.filterMood = false
      }
    this.allProducts = this.allProducts.filter(product =>
      product.title.toLowerCase().includes(filterValue)
    );
  }
  ngOnDestroy(): void {
    this.authStoreSubcription?.unsubscribe();
    this.productsStoreSubcription?.unsubscribe();
  }

}
