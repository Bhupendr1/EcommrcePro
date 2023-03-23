import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { product } from '../data-type';
import { ProductserviceService } from '../services/productservice.service';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent implements OnInit {

  productData:undefined | product;
  productMessage:undefined | string;
  constructor(private router:Router,private route:ActivatedRoute,private productservice:ProductserviceService) { }

  ngOnInit(): void {
    let productId=this.route.snapshot.paramMap.get('id')
    console.log(productId)
    productId && this.productservice.getProduct(productId).subscribe((data)=>{
      this.productData=data;
     //console.log(data)
    })
  }
 
  submit(data:any){
    if(this.productData){
      data.id=this.productData.id
    }
this.productservice.updateProduct(data).subscribe((result)=>{
  if(result){
    this.productMessage="Product has updated";
    // this.router.navigate(['seller-home']);
  }
});setTimeout(()=>{
  this.productMessage=undefined
},2000)
}
}
