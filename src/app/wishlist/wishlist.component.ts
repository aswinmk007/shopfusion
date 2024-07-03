import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit{

  allProducts:any=[]


  constructor(private api:ApiService,private toaster:ToastrService){}
  ngOnInit(): void {
    this.getWishlist()
  }

  getWishlist(){
    this.api.getWishlistAPI().subscribe((result:any)=>{
      this.allProducts = result
      this.api.getWishlistCount()
    })
  }

  detletWishlist(id:any){
    this.api.removeWishlistAPI(id).subscribe((result:any)=>{
      this.getWishlist()
    })
  }

  //add to cart
  addcart(product:any){
    if(sessionStorage.getItem("token")){
      product.quantity = 1
      this.api.addToCartAPI(product).subscribe({
        next:(result:any)=>{
          this.toaster.success(result)
          this.api.getCartCount()
          this.detletWishlist(product._id)
        },
        error:(reason:any)=>{
          this.toaster.warning(reason.error)
        }
      })

    }else{
      this.toaster.warning("Please Login")
    }
  }

}
