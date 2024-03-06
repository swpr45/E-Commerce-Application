import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Product } from '../shared/models/product';
import { ShopService } from './shop.service';
import { Brand } from '../shared/models/brand';
import { type } from '../shared/models/type';
import { ShopParams } from '../shared/models/shopParams';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent implements OnInit{
  
  @ViewChild('search') searchTerm?:ElementRef
  product:Product[] = [];
  brand:Brand[]=[];
  type:type[]=[];
  shopParams = new ShopParams();
  sortOptions = [
    {name:'Alphabetical',value:'name'},
    {name:'Low to high',value:'priceAsc'},
    {name:'High to Low',value:'priceDesc'},
    
  ];
  totalCount = 0;
  


  constructor(private shopService:ShopService){}


  
  ngOnInit(): void {
   this.getProducts();
   this.getBrands();
   this.getTypes();

  }
    getProducts()
    {
       this.shopService.getProduct(this.shopParams).subscribe({
        next: response => 
        {
          this.product = response.data;
          this.shopParams.pageNumber = response.pageIndex;
          this.shopParams.pageSize = response.pageSize;
          this.totalCount = response.count;
        },
        error:error => console.log(error),
    })
    }
  
   getBrands()
    {
       this.shopService.getBrands().subscribe({
        next: response => this.brand = [{id:0,name:
        'All'}, ...response],
        error:error => console.log(error)
        
    })
    }

     getTypes()
    {
       this.shopService.getTypes().subscribe({
        next: response => this.type = [{id:0,name:
        'All'}, ...response],
        error:error => console.log(this.type),
    })
    }

    onBrandSelected(brandId:number)
    {
      this.shopParams.brandId = brandId;
      this.getProducts();
    }
    onTypeSelected(typeId:number)
    {
      this.shopParams.typeId = typeId;
      this.getProducts();
    }

    onSortSelected(event:any)
    {
     this.shopParams.sort= event.target.value;
     this.getProducts();
    }

    onPageChanged(event:any)
    {
      if(this.shopParams.pageNumber !== event)
      {
        this.shopParams.pageNumber = event;
        this.getProducts();
      }
    }

    onSearch()
    {
      this.shopParams.search = this.searchTerm?.nativeElement.value;
      this.getProducts();
    }
    onReset()
    {
      if(this.searchTerm) this.searchTerm.nativeElement.value='';
      this.shopParams = new ShopParams();
      this.getProducts();
    }
  
}
