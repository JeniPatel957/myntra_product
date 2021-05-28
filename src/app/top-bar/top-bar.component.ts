import { Router } from '@angular/router';
import { ApiService } from './../api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  data: any;
  searchData = "";
  addToCartList: any = [];
  constructor(private api: ApiService,private router : Router) {
  }

  ngOnInit(): void {
    this.api.getdata().subscribe(data => {
      this.data = data;
    });
    console.log(this.data)
    this.data = this.data
    let dataList: any = localStorage.getItem("addToCart");
    this.addToCartList = dataList ? JSON.parse(dataList) : [];
  }

  setSearchData() {
    this.api.setSearchData(this.searchData);
  }
  redirectToPage(page){
    this.router.navigate([page]);
  }
}

