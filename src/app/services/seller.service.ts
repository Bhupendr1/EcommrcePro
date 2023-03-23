import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Login, SignUp } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import {  Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class SellerService {

  isSellerLoggedIn= new BehaviorSubject<boolean>(false)
  isLoginError= new EventEmitter<boolean>(false)

  constructor(private http:HttpClient,private router:Router) { }
  userSignUp(data:SignUp){
    this.http.post('http://localhost:3000/seller',data,{observe:'response'})
    .subscribe((result)=>{
      localStorage.setItem("seller",JSON.stringify(result.body))
      this.router.navigate(['seller-home']);
      this.isSellerLoggedIn.next(true)
      //console.warn('result',result);
    });
  }
  reloadSeller() {
    if(localStorage.getItem('seller')){
      this.isSellerLoggedIn.next(true)
      this.router.navigate(['seller-home']);
    }
    //throw new Error('Method not implemented.');
  }
  userLogin(data:Login){
    this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`,{observe:'response'})
    .subscribe((res:any)=>{
     
      if(res && res.body && res.body.length){
      localStorage.setItem("seller",JSON.stringify(res.body))
      this.router.navigate(['seller-home']);
      }else{
        console.log("login not");
        this.isLoginError.emit(true);
      }
   
    })
  }
}
