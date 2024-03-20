import { Component, HostListener, Input, } from '@angular/core';
import { Product } from '../../shared/models/product';
import { Router} from '@angular/router';
import { BasketService } from '../../basket/basket.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss'
})
export class ProductItemComponent {
  @Input() productData?: Product;
  constructor(private router: Router,private basketService:BasketService) {}

  additemToBasket()
  {
    this.productData && this.basketService.addItemToBasket(this.productData);
  }

  @HostListener('click',['$event']) 
  show(event: MouseEvent) 
  {
    const target = event.target as HTMLElement;
    if (target.tagName !== 'BUTTON') {
      this.router.navigate(['/shop/', this.productData?.id]);
    }
  }
}
