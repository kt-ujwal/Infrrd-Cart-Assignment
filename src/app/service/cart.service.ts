import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cartItemList: any = [];
  public productList = new BehaviorSubject<any>([]);
  public cartItemCount = new BehaviorSubject<number>(0);
  public cartTotal = new BehaviorSubject<number>(0);
  public search = new BehaviorSubject<string>('');

  constructor() {}

  //getter for products
  getProducts() {
    return this.productList.asObservable();
  }

  //setter for products
  setProducts(product: any) {
    this.cartItemList.push(...product);
    this.productList.next(product);
  }

  addtoCart(product: any) {
    let added = false;
    for (let p of this.cartItemList) {
      if (p.id === product.id) {
        p.quantity += 1;
        added = true;
        break;
      }
    }
    if (!added) {
      product.quantity = 1;
      this.cartItemList.push(product);
    }
    this.productList.next(this.cartItemList);

    // Update cartItemCount and cartTotal in local storage
    localStorage.setItem('cartItemCount', JSON.stringify(this.cartItemCount.value + 1));
    localStorage.setItem('cartTotal', JSON.stringify(this.cartTotal.value + product.price));
    this.cartItemCount.next(this.cartItemCount.value + 1);
    this.cartTotal.next(this.cartTotal.value + product.price);
  }

  getTotalPrice(): number {
    return this.cartTotal.value;
  }

  removeCartItem(product: any) {
    this.cartItemList.map((a: any, index: any) => {
      if (product.id == a.id) {
        this.cartItemList.splice(index, 1);
        this.cartTotal.next(this.cartTotal.value - product.price * product.quantity);
      }
    });
    this.productList.next(this.cartItemList);
    this.cartItemCount.next(this.cartItemCount.value - 1);
    localStorage.setItem('cartTotal', JSON.stringify(this.cartTotal.value));
  }

  incrementCartItem(product: any) {
    this.cartItemList.map((a: any) => {
      if (product.id == a.id) {
        a.quantity++;
        a.total = a.price * a.quantity;
        this.cartTotal.next(this.cartTotal.value + a.price);
      }
    });
    this.productList.next(this.cartItemList);
    this.cartItemCount.next(this.cartItemCount.value + 1);
    localStorage.setItem('cartTotal', JSON.stringify(this.cartTotal.value));
  }
  decrementCartItem(product: any) {
    this.cartItemList.map((a: any) => {
      if (product.id == a.id) {
        if (a.quantity > 1) {
          a.quantity--;
          a.total = a.price * a.quantity;
        } else {
          this.removeCartItem(product);
        }
      }
    });
    this.productList.next(this.cartItemList);
    this.cartItemCount.next(this.cartItemCount.value - 1);
    localStorage.setItem('cartTotal', JSON.stringify(this.cartTotal.value));
  }

  emptyCart() {
    this.cartItemList = [];
    this.productList.next(this.cartItemList);
    this.cartItemCount.next(0);
  }
}
