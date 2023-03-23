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
  constructor(private activeRoute: ActivatedRoute, private product: ProductserviceService) { }
  ngOnInit() {
    let query = this.activeRoute.snapshot.paramMap.get('query')
    query && this.product.SearchProducts(query).subscribe((result) => {
      this.searchResult = result
     })
  }
}
