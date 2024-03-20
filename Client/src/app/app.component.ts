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
 

//  The error message "ReferenceError: localStorage is not defined" indicates that the localStorage object is being referenced in your Angular application, but it is not available. This typically happens when code that relies on localStorage is being executed in an environment where localStorage is not supported or available.
//because of above error i have platform id in contructor and checked it in ngOnInit
  constructor(private basketService:BasketService,@Inject(PLATFORM_ID) private platformId: Object){}


  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) 
    {
      const basketId = localStorage.getItem('basket_id');

    if(basketId) this.basketService.getBasket(basketId);
    }
    
  }
}
