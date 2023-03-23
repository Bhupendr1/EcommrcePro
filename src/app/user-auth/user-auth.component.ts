import { Component, OnInit } from '@angular/core';
import { cart, Login, product, SignUp } from '../data-type';
import { ProductserviceService } from '../services/productservice.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {
  showLogin: boolean = true
  authError: string = "";
  constructor(private user: UserService, private product: ProductserviceService) { }
  ngOnInit(): void {
    this.user.userAuthReload();
  }
  signUp(data: SignUp) {
    this.user.userSignup(data)
  }
  Login(data: Login) {
    this.user.userlogin(data)
    this.user.invalidUserAuth.subscribe((result) => {
      console.warn("apple", result)
      if (result) {
        this.authError = "Please Enter Valid User Details";
      } else {
        this.localCarrToRemoteCart()
      }
    })
  }
  openSignup() {
    this.showLogin = false
  }
  openLogin() {
    this.showLogin = true
  }
  localCarrToRemoteCart() {
    let data = localStorage.getItem('localCart');
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    if (data) {
      let cartDataList: product[] = JSON.parse(data);
      cartDataList.forEach((product: product, index) => {
        let cartData: cart = {
          ...product,
          productId: product.id,
          userId
        };
        delete cartData.id;
        setTimeout(() => {
          this.product.addToCart(cartData).subscribe((result) => {
            if (result) {
              console.warn("item stored in DB")
            }
          })
          if (cartDataList.length === index + 1) {
            localStorage.removeItem('localCart')
          }
        }, 500);
      });
    } 
    setTimeout(() => {
      this.product.getCartList(userId);
    }, 2000);
  }
}
