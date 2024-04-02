import { Component } from '@angular/core';
import { BasketService } from '../../basket/basket.service';
import { BasketItem } from '../../shared/models/basket';
import { AccountService } from '../../account/account.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  constructor(public basketService:BasketService,public accountService:AccountService){}

  getCount(items:BasketItem[])
  {
    //these will give us total count of items in the cart
    return items.reduce((sum,item) => sum + item.quantity,0);
  }
}
