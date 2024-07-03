import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  yourCart:any = []
  cartTotal:number = 0 
  couponStatus:boolean = false
  couponClickStatus:boolean = false

  constructor(private api:ApiService,private router:Router){}

  ngOnInit(): void {
    if(sessionStorage.getItem("token")){
      this.getCartItems()
    }
  }

  getCartItems(){
    this.api.getCartAPI().subscribe((result:any)=>{
      this.yourCart = result
      this.getCartTotal()

    })
  }

  getCartTotal(){
   this.cartTotal = Math.ceil(this.yourCart.map((item:any)=>item.totalprice).reduce(((p1:any,p2:any)=>p1+p2)))
  }

  removeItem(id:any){
    this.api.removeCartItemAPI(id).subscribe({
      next:(result:any)=>{
        this.getCartItems()
        this.api.getCartCount()


      },
      error:(reason:any)=>{
        console.log(reason);
        
      }
    })
  }

  //increment cart
  incremenyCart(id:any){
    this.api.getIncrementCartAPI(id).subscribe({
      next:(result:any)=>{
        this.getCartItems()
        this.api.getCartCount()
      },
      error:(reason:any)=>{
        console.log(reason);
        
      }
    })
  }

  //decrement cart
  decrementCart(id:any){
    this.api.getDecrementCartAPI(id).subscribe({
      next:(result:any)=>{
        this.getCartItems()
        this.api.getCartCount()
      },
      error:(reason:any)=>{
        console.log(reason);
        
      }
    })
  }

  //empty cart
  emptyCart(){
    this.api.emptyCartAPI().subscribe({
      next:(result:any)=>{
        this.getCartItems()
        this.api.getCartCount()
      },
      error:(reason:any)=>{
        console.log(reason);
        
      }
    })
  }

  getCoupon(){
    this.couponStatus = true
  }

  backToOfferbtn(){
    this.couponStatus=false
  }

  Discount5persentage(){
    this.couponClickStatus = true
    let discount = Math.ceil(this.cartTotal*.05)
    this.cartTotal -= discount
  

  }

  Discount20persentage(){
    this.couponClickStatus = true
    let discount = Math.ceil(this.cartTotal*.2)
    this.cartTotal -= discount
  

  }

  Discount50persentage(){
    this.couponClickStatus = true
    let discount = Math.ceil(this.cartTotal*.5)
    this.cartTotal -= discount
  

  }

  checkOut(){
    sessionStorage.setItem("cartTotal",JSON.stringify(this.cartTotal))
    this.router.navigateByUrl('checkout')
  }
}
