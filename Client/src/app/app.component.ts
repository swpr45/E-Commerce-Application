import { Component, Inject,OnInit, PLATFORM_ID } from '@angular/core';
import { BasketService } from './basket/basket.service';
import { isPlatformBrowser } from '@angular/common';
import { AccountService } from './account/account.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'Skinet';
 


  constructor(private basketService:BasketService,private accountService:AccountService,@Inject(PLATFORM_ID) private platformId: Object){}


  ngOnInit(): void 
  {
    if (isPlatformBrowser(this.platformId)) {
      // Access localStorage here
      this.checkBasketId();
      this.loadCurrentUser();
    }
    
  }
  checkBasketId(): void {
    const basketId = localStorage.getItem('basket_id');
    if (basketId) {
        this.basketService.getBasket(basketId);
    } 
  }

  loadCurrentUser()
  {
    const token = localStorage.getItem('token');
    this.accountService.loadCurrentUser(token).subscribe();
  }
}
