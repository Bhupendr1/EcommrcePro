import { Component, OnInit } from '@angular/core';
import { SignUp ,Login} from '../data-type';
import { SellerService } from '../services/seller.service';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit {
  isError='';
  showLogin=false;
  constructor(private seller:SellerService) { }

  ngOnInit(): void {
    this.seller.reloadSeller();
  }
  signup(data:SignUp){
    //console.table(data);
    this.seller.userSignUp(data);
  }
  login(data:Login){
    this.isError='';
    this.seller.userLogin(data);
    this.seller.isLoginError.subscribe(sellererror=>{
      if(sellererror){
        this.isError="Email and  password is  not  correct"
      }
    })
  }
  OpenLogin(){
  this.showLogin=true
  }
  OpenSignUp(){
    this.showLogin=false
    }
}
