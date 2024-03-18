import { Component, HostListener, Input, } from '@angular/core';
import { Product } from '../../shared/models/product';
import { Router} from '@angular/router';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss'
})
export class ProductItemComponent {
  @Input() productData?: Product;
  constructor(private router: Router) {}

  @HostListener('click',['$event']) 
  show()
  {
    this.router.navigate(['/shop/', this.productData?.id]);
  }
}
