import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, Type } from '@angular/core';
import { Pagination } from '../shared/models/Pagination';
import { Product } from '../shared/models/product';
import { Brand } from '../shared/models/brand';
import { type } from '../shared/models/type';
import { ShopParams } from '../shared/models/shopParams';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = 'https://localhost:5001/api/';
  constructor(private http:HttpClient) { }

  getProduct(shopParams:ShopParams)
  {
    let params = new HttpParams();
    if(shopParams.brandId > 0) params = params.append('brandId',shopParams.brandId);
    if(shopParams.typeId > 0) params = params.append('typeId',shopParams.typeId);
    params = params.append('sort',shopParams.sort);
    params = params.append('pageIndex',shopParams.pageNumber);
    params = params.append('pageSize',shopParams.pageSize);
    if(shopParams.search) params = params.append('search',shopParams.search);

    
    return this.http.get<Pagination<Product[]>>(this.baseUrl + 'Product',{params})
    
  }


  getBrands()
  {
    return this.http.get<Brand[]>(this.baseUrl + 'Product/brands')
  }

  getTypes()
  {
    return this.http.get<type[]>(this.baseUrl + 'Product/types')
    
  }
}
