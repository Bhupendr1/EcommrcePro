import { Component, OnInit } from '@angular/core';
import { product } from '../data-type';
import { ProductserviceService } from '../services/productservice.service';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent implements OnInit {
  addProductMessage: string|undefined;
    constructor(private productservice:ProductserviceService) { }
  ngOnInit(): void {
    }
  addProduct(data:product) {
    //console.log(data)
   this.productservice.addProduct(data).subscribe(res=>{
   if (res) {
    this.addProductMessage="Product add successfully!";
   }
   setTimeout(()=>(this.addProductMessage=undefined),3000)
   });
   
  }
 
}
