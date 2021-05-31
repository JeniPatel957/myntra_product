import { logging } from 'protractor';
import { Router } from '@angular/router';
import { ApiService } from './../api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
 
  searchData = "";
  addToCartList: any = [];
  tempList: any = [];
  constructor(private api: ApiService, private router: Router) {
  }

  ngOnInit(): void {
    
    let dataList: any = localStorage.getItem("addToCart");
    this.addToCartList = dataList ? JSON.parse(dataList) : [];

    this.api.getCardData().subscribe(res => {
      this.addToCartList = res;
    })
  }

  setSearchData() {
    this.api.setSearchData(this.searchData);
  }
  
  redirectToPage(page) {
    this.router.navigate([page]);
  }
}

