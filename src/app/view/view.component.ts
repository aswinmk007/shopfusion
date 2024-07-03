import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit{

  product:any = {}
  
  constructor(private route:ActivatedRoute,private api:ApiService,private toaster:ToastrService){}

  ngOnInit(): void {
    this.route.params.subscribe((result:any)=>{
      const {id} = result
      this.getProductDetails(id)
    })
  }

  getProductDetails(id:any){
    this.api.getAProductAPI(id).subscribe((result:any)=>{
      this.product = result
    })
  }

  addwishlist(product:any){
    if(sessionStorage.getItem("token")){
      this.api.addToWishlistAPI(product).subscribe({
        next:(result:any)=>{
          this.toaster.success(`product ${result.title} added to your wishlist!!!`)
          this.api.getWishlistCount()
        },
        error:(reason:any)=>{
          console.log(reason);
          this.toaster.warning(reason.error)
          
        }
      })


    }else{
      this.toaster.warning("Please Login")
    }
  }

  //add to cart
  addcart(product:any){
    if(sessionStorage.getItem("token")){
      product.quantity = 1
      this.api.addToCartAPI(product).subscribe({
        next:(result:any)=>{
          this.toaster.success(result)
          this.api.getCartCount()
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
