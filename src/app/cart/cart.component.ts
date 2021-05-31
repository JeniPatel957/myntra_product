import { ApiService } from './../api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  addToCartList: any = [];
  totlaCartAmount: any[];

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    let dataList: any = localStorage.getItem("addToCart");
    this.addToCartList = dataList ? JSON.parse(dataList) : [];
    this.addToCartList.forEach(e => {
      e.quantity = 1;
      e.totalPrice = e.salePrice * e.quantity;
    
    });
  }
  removeFromBag(data) {
    let index = this.addToCartList.findIndex(e => data.productId == e.productId);
    if (index != -1) {
      this.addToCartList.splice(index, 1);
      localStorage.setItem("addToCart", JSON.stringify(this.addToCartList));
      this.api.setCardData(this.addToCartList);
    }

  }
  selectedQuantity(data) {
    data.totalPrice = data.salePrice * data.quantity;
  }

  totalAmountPrice = 0;
  discountAmount: any = 0;
  finalAmount: any = 0;
  bagTotal: any = 0;
  totalamount() {
    this.totalAmountPrice = 0;
    this.addToCartList.forEach(e => {
      this.totalAmountPrice += e.totalPrice;
    });

    this.discountAmount = (this.totalAmountPrice * 2 / 100).toFixed(2);
    this.finalAmount = (this.totalAmountPrice - this.discountAmount).toFixed(2);
    return this.totalAmountPrice;
  }


}
