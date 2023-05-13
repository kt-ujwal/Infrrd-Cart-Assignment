import { TestBed } from '@angular/core/testing';
import { CartService } from './cart.service';

describe('CartService', () => {
  let service: CartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update the cart item count when a product is added', () => {
    const product = {id: 1, name: 'Product 1', price: 10};
    service.addtoCart(product);
    expect(service.cartItemCount.value).toBe(1);
  });

  it('should update the cart item count when a product is removed', () => {
    const product1 = {id: 1, name: 'Product 1', price: 10};
    const product2 = {id: 2, name: 'Product 2', price: 20};
    service.addtoCart(product1);
    service.addtoCart(product2);
    service.removeCartItem(product1);
    expect(service.cartItemCount.value).toBe(1);
  });

  it('should increment the quantity of a product in the cart', () => {
    const product = {id: 1, name: 'Product 1', price: 10};
    service.addtoCart(product);
    service.incrementCartItem(product);
    service.getProducts().subscribe((cartItems) => {
      expect(cartItems.length).toBe(1);
      expect(cartItems[0]).toEqual({...product, quantity: 2, total: 20});
    });
    expect(service.cartItemCount.value).toBe(2);
  });

  it('should decrement the quantity of a product in the cart', () => {
    const product = {id: 1, name: 'Product 1', price: 10};
    service.addtoCart(product);
    service.incrementCartItem(product);
    service.decrementCartItem(product);
    service.getProducts().subscribe((cartItems) => {
      expect(cartItems.length).toBe(1);
      expect(cartItems[0]).toEqual({...product, quantity: 1, total: 10});
    });
    expect(service.cartItemCount.value).toBe(1);
  });

  it('should empty the cart', () => {
    const product1 = {id: 1, name: 'Product 1', price: 10};
    const product2 = {id: 2, name: 'Product 2', price: 20};
    service.addtoCart(product1);
    service.addtoCart(product2);
    expect(service.cartItemList.length).toBe(2);
    expect(service.cartItemCount.value).toBe(2);
    service.emptyCart();
    expect(service.cartItemList.length).toBe(0);
    expect(service.cartItemCount.value).toBe(0);
  });
})
