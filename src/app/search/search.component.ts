import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { product } from '../data-type';
import { ProductserviceService } from '../services/productservice.service';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchResult: undefined | product[]
  content: string='';
  constructor(private activeRoute: ActivatedRoute, private product: ProductserviceService) { }
  ngOnInit() {
    this.activeRoute.params.subscribe((params) => {
      this.content = params['query'];
      this.product.SearchProducts(this.content).subscribe((response: product[]) => {
        this.searchResult = response;
      });
    });
  }
}
