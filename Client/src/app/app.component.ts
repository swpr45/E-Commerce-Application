import { Component, Inject,OnInit, PLATFORM_ID } from '@angular/core';
import { BasketService } from './basket/basket.service';
import { isPlatformBrowser } from '@angular/common';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'Skinet';
 


  constructor(private basketService:BasketService){}


  ngOnInit(): void 
  {
    this.checkBasketId();
  }
  checkBasketId(): void {
    const basketId = localStorage.getItem('basket_id');
    if (basketId) {
        this.basketService.getBasket(basketId);
    } 
  }
}
