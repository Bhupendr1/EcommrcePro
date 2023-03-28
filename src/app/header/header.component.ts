import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { product } from '../data-type';
import { ProductserviceService } from '../services/productservice.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent{
  menuType:string='default';
  constructor(private route:Router,private product:ProductserviceService) { }
  SellerName:string="";
  userName:string="";
  searchResult:undefined | product[];
  cartItems=0
    ngOnInit(): void {
      this.route.events.subscribe((val:any)=>{
      if(val.url){
        if(localStorage.getItem('seller') && val.url.includes('seller')){
          let sellerStore= localStorage.getItem('seller');
          let SellerData=sellerStore && JSON.parse(sellerStore)[0];
          this.SellerName=SellerData.name;   
          this.menuType='seller';
          console.warn(this.SellerName)
        }else if(localStorage.getItem('user')){
            let userStore = localStorage.getItem('user')
            let userData = userStore && JSON.parse(userStore);
            this.userName=userData.name;
            this.menuType='user';
            this.product.getCartList(userData.id);
        }else{
          this.menuType='default';
        }
      }
    })
    let cartData= localStorage.getItem('localCart');
    if(cartData){
      this.cartItems=JSON.parse(cartData).length
    }
    this.product.cartData.subscribe((items)=>{
      this.cartItems=items.length
    })
    
  }
 

  logout(){
    debugger
    localStorage.removeItem('seller');
    this.route.navigate(['/']);
  }
  userLogOut(){
    localStorage.removeItem('user');
    this.route.navigate(['/user-auth']);
    this.product.cartData.emit([]);
  }
serchProduct(query:KeyboardEvent){
if(query){
  const element = query.target as HTMLInputElement;
  this.product.SearchProducts(element.value).subscribe((result)=>{
  if(result.length>5){
    result.length=length;
  }
    this.searchResult=result
  })
}
}
hideSerch(){
  this.searchResult=undefined;
}
submitSearch(val:string){
  this.route.navigate([`search/${val}`])
}
redirectToDetails(id:number){
this.route.navigate(['/details/'+id])

}
}
  