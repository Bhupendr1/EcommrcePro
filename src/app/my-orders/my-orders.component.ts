import { Component, OnInit } from '@angular/core';
import { order } from '../data-type';
import { ProductserviceService } from '../services/productservice.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  orderData: order[] | undefined
  constructor(private product: ProductserviceService) { }
  ngOnInit(): void {
    this.getOrderList()
  }
  cancelOrder(orderId: number | undefined) {
    orderId && this.product.cancelOrder(orderId).subscribe((result) => {
      this.getOrderList()
    })
  }
  getOrderList() {
    this.product.orderlist().subscribe((result) => {
      this.orderData = result
    })
  }
}
