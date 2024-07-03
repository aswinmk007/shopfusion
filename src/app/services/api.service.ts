import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  wishlistCount = new BehaviorSubject(0)
  cartCount = new BehaviorSubject(0)
  server_url = "https://shopfusion-server-2.onrender.com"

  constructor(private http:HttpClient) { 
    if(sessionStorage.getItem("token")){
      this.getWishlistCount()
      this.getCartCount()
    }
  }

  getAllproducts(){
    return this.http.get(`${this.server_url}/all-products`)
  }

  getAProductAPI(id:any){
    return this.http.get(`${this.server_url}/${id}/get-a-product`)
  }

  registerAPI(user:any){
    return this.http.post(`${this.server_url}/register`,user)
  }

  loginAPI(user:any){
    return this.http.post(`${this.server_url}/login`,user)
  }
   
  appendToken(){
    const token = sessionStorage.getItem('token')
    let headers = new HttpHeaders()
    if(token){
      headers = headers.append("Authorization",`Bearer ${token}`)
    }
    return {headers}
  }
  //add to wishlist
  addToWishlistAPI(product:any){
    return this.http.post(`${this.server_url}/user/add-to-wishlist`,product,this.appendToken())
  }

  //get wishlist
  getWishlistAPI(){
    return this.http.get(`${this.server_url}/get-wishlist`,this.appendToken())
  }

  getWishlistCount(){
    this.getWishlistAPI().subscribe((result:any)=>{
      this.wishlistCount.next(result.length)
    })
  }

  //remove wishlist
removeWishlistAPI(id:any){
  return this.http.delete(`${this.server_url}/remove-wishlist/${id}/item`,this.appendToken())
  
}

//add to cart
addToCartAPI(product:any){
  return this.http.post(`${this.server_url}/user/add-to-cart`,product,this.appendToken())
}

//get cart
getCartAPI(){
  return this.http.get(`${this.server_url}/get-cart`,this.appendToken())
}

getCartCount(){
  this.getCartAPI().subscribe((result:any)=>{
    this.cartCount.next(result.length)
  })
}

//remove cart item
removeCartItemAPI(id:any){
  return this.http.delete(`${this.server_url}/remove-cartItem/${id}/item`,this.appendToken())
}

//increment cart
getIncrementCartAPI(id:any){
  return this.http.get(`${this.server_url}/${id}/increment-cart`,this.appendToken())
}

//decrement cart
getDecrementCartAPI(id:any){
  return this.http.get(`${this.server_url}/${id}/decrement-cart`,this.appendToken())
}

//empty cart 
emptyCartAPI(){
  return this.http.delete(`${this.server_url}/empty-cart`,this.appendToken())
}
}


