import { Component, OnInit } from '@angular/core';
import { product } from '../data-type';
import { ProductserviceService } from '../services/productservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
popularProducts:undefined | product[]
trendyProducts:undefined | product[]
 constructor( private product:ProductserviceService) { }

  ngOnInit(): void {
    this.product.popularProducts().subscribe((data)=>{
      this.popularProducts=data
      console.log(data)
    });
    this.product.trendyProducts().subscribe((data)=>{
      this.trendyProducts=data;
      
    });
  }
}
