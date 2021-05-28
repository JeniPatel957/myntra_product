import { Router, RouterModule } from '@angular/router';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ApiService } from './../api.service';
import { Component, OnInit, Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Pipe, PipeTransform } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  data: any;
  tempList: any = [];
  addToCartList : any = [];
  constructor(private api: ApiService,private router : Router) {
  }

  ngOnInit(): void {
    this.api.getdata().subscribe((data : any) => {
      data.forEach(e => {
        e.salePrice = this.returnSalePrice(e);
      });
      this.data = data;
      this.tempList = data;
    });
    console.log(this.data)
    this.data = this.data

    this.api.getSearchData().subscribe(res => {
      if (res.from == "leftSide") {
        this.data = this.tempList.filter(a => {
          if (res.selectedBrand.length != 0 && res.selectedColor.length != 0) {
            return res.selectedBrand.includes(a.brand) && res.selectedColor.includes(a.primaryColour)
          }
          else if (res.selectedBrand.length != 0) {
            return res.selectedBrand.includes(a.brand)
          }
          else if (res.selectedColor.length != 0) {
            return res.selectedColor.includes(a.primaryColour)
          }
        });

        if (res.selectedBrand.length == 0 && res.selectedColor.length == 0 && res.selectedPriceRange.length == 0) {
          this.data = this.tempList;
        }
      }
      else {
        const filterValue = res ? res.toLowerCase() : "";
        // this.data = this.tempList.filter(a => a.brand.toLowerCase().includes(filterValue));
        this.data = this.tempList.filter(a => a.category.toLowerCase().includes(filterValue));
        this.data = this.tempList.filter(a => a.productName.toLowerCase().includes(filterValue));
      }
    });

    let dataList : any = localStorage.getItem("addToCart");
    this.addToCartList = dataList ? JSON.parse(dataList) : [];

  }

  returnSalePrice(data) {
    let price = data.mrp - (data.mrp * data.discount / 100);
    return price;
  }

  returnRate(data) {
    let rate = data.rating;
    let finalRate = parseFloat(rate).toFixed(1);
    return finalRate;
  }
  
  addToBag(data) {
    this.addToCartList.push(data);
    localStorage.setItem("addToCart", JSON.stringify(this.addToCartList));
    
  }

  checkItemIncart(data) {
    let flg = false;
    this.addToCartList.forEach(e => {
      if(data.productId == e.productId) {
        flg = true;
      }
    });
    return flg;
  }

  removeFromBag(data) {
    let index = this.addToCartList.findIndex(e => data.productId == e.productId);
    if(index != -1) {
      this.addToCartList.splice(index,1);
      localStorage.setItem("addToCart",JSON.stringify(this.addToCartList));
    }
  }

}
