import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { CartService } from '../../service/cart.service';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  public ProductsCatalog: any;
  public cartItemCount: number = 0;
  public sortBy: string = '';
  public filterCategory : any
  searchKey:string ="";
  constructor(
    private api: ApiService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.api.getProduct().subscribe((response) => {
      this.ProductsCatalog = response;
      this.filterCategory = response;
      // Get cart item count from local storage
      const cartItemCount = JSON.parse(localStorage.getItem('cartItemCount') || '0');
      if (cartItemCount > 0) {
        this.cartItemCount = cartItemCount;
      }

      this.ProductsCatalog.forEach((a: any) => {
        if(a.category ==="women's clothing" || a.category ==="men's clothing"){
          a.category ="fashion"
        }
        Object.assign(a, { quantity: 1, total: a.price });
      });
    });

    this.cartService.search.subscribe((val:any)=>{
      this.searchKey = val;
    })
  }

  addtocart(item: any) {
    this.cartService.addtoCart(item);
    this.cartItemCount++;

    // Update cart item count in local storage
    localStorage.setItem('cartItemCount', JSON.stringify(this.cartItemCount));
  }
  sortProducts() {
    if (this.sortBy === 'title') {
      this.ProductsCatalog.sort((a: any, b: any) =>
        a.title.localeCompare(b.title)
      );
    } else if (this.sortBy === 'price') {
      this.ProductsCatalog.sort((a: any, b: any) => a.price - b.price);
    }
  }
  filter(category:string){
    this.filterCategory = this.ProductsCatalog
      .filter((a:any)=>{
        if(a.category == category || category==''){
          return a;
        }
      })
  }

}
