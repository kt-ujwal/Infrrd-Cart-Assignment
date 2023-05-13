import {Component, OnInit} from '@angular/core';
import {CartService} from "../../service/cart.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent  implements OnInit{
  public products : any = [];
  public gTotal !: number;
  constructor(private cartService : CartService){ }

  ngOnInit(): void {
    this.cartService.getProducts()
      .subscribe(res=>{
        this.products = res;
        this.gTotal = this.cartService.getTotalPrice();
      })
  }
  removeItem(item: any){
    this.cartService.removeCartItem(item);
  }
  emptycart(){
    this.cartService.emptyCart();
  }
  decrementItem(item:any){
    this.cartService.decrementCartItem(item);
  }
  incrementItem(item:any){
    this.cartService.incrementCartItem(item);
  }
}
