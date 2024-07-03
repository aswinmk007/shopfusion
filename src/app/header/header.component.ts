import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  username:string = ""
  wishlistCount:Number = 0
  cartCount:Number = 0
  constructor(private api:ApiService,private router:Router){}
  ngOnInit(): void {
    if(sessionStorage.getItem("user")){
      this.username = JSON.parse(sessionStorage.getItem("user")|| "").username.split(" ")[0]
      this.api.wishlistCount.subscribe((result:any)=>{
        this.wishlistCount = result
      })
      this.api.cartCount.subscribe((result:any)=>{
        this.cartCount = result
      })
    }else{
      this.username = ""
    }
  }

  logout(){
    sessionStorage.clear()
    this.username = ""
    this.wishlistCount = 0
    this.cartCount = 0
    this.router.navigateByUrl('/')
    

  }

}
