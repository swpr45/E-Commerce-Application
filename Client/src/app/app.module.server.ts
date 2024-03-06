import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { ShopModule } from './shop/shop.module';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
