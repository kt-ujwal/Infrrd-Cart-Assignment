import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartComponent } from './cart.component';
import { CartService } from '../../service/cart.service';
import { of } from 'rxjs';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let cartService: jasmine.SpyObj<CartService>;

  beforeEach(async () => {
    cartService = jasmine.createSpyObj('CartService', ['getProducts', 'removeCartItem', 'emptyCart', 'decrementCartItem', 'incrementCartItem', 'getTotalPrice']);
    await TestBed.configureTestingModule({
      declarations: [ CartComponent ],
      providers: [{ provide: CartService, useValue: cartService }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load cart products and total price on component initialization', () => {
    const products = [{ id: 1, name: 'Product 1', price: 100 }, { id: 2, name: 'Product 2', price: 200 }];
    const totalPrice = 300;
    cartService.getProducts.and.returnValue(of(products));
    cartService.getTotalPrice.and.returnValue(totalPrice);
    fixture.detectChanges();
    expect(component.products).toEqual(products);
    expect(component.gTotal).toEqual(totalPrice);
  });

  it('should call cartService.removeCartItem() when removeItem() is called', () => {
    const item = { id: 1, name: 'Product 1', price: 100 };
    component.removeItem(item);
    expect(cartService.removeCartItem).toHaveBeenCalledWith(item);
  });

  it('should call cartService.emptyCart() when emptycart() is called', () => {
    component.emptycart();
    expect(cartService.emptyCart).toHaveBeenCalled();
  });

  it('should call cartService.decrementCartItem() when decrementItem() is called', () => {
    const item = { id: 1, name: 'Product 1', price: 100, quantity: 2 };
    component.decrementItem(item);
    expect(cartService.decrementCartItem).toHaveBeenCalledWith(item);
  });

  it('should call cartService.incrementCartItem() when incrementItem() is called', () => {
    const item = { id: 1, name: 'Product 1', price: 100, quantity: 2 };
    component.incrementItem(item);
    expect(cartService.incrementCartItem).toHaveBeenCalledWith(item);
  });
});

