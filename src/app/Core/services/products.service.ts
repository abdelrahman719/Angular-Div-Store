import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { product, productToAdd } from '../interfaces/product';


const productsApi = environment.BACKEND + 'products'

@Injectable({
  providedIn: 'root'
})

export class ProductsService {

  constructor(private http: HttpClient) { }


  getProducts() {
    return this.http.get<product[]>(productsApi)
  }
  addProduct(productData: productToAdd | any) {
    return this.http.post<any>(productsApi, productData)
  }
  updateProduct(productData : productToAdd |any , productId:number) { 
    return this.http.put<any>(`${productsApi}/${productId}`, productData)
  }
  deleteProduct(productId:number) {
    return this.http.delete<any>(`${productsApi}/${productId}`)
  }

  getProductDetailes(productId:number){
    return this.http.get<product>(`${productsApi}/${productId}`)
  }
  getCategories(){
    return this.http.get<any>(`${productsApi}/categories`)
  }
  getProductsInCategories(category:string){
    return this.http.get<any>(`${productsApi}/category/${category}`)
  }

}
