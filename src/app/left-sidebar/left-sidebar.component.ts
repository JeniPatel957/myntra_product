import { ApiService } from './../api.service';
import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';

@Component({
  selector: 'app-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.scss']
})

export class LeftSidebarComponent implements OnInit {
  brands: string;
  data: any;
  priceRangeList = [
    { min: 0, max: 200 , isSelectedPrice:false},
    { min: 200, max: 400   ,isSelectedPrice:false},
    { min: 400, max: 1000  ,isSelectedPrice:false},
    { min: 1000, max: 1500 ,isSelectedPrice:false},
    { min: 1500, max: 2000 ,isSelectedPrice:false},
    { min: 2000, max: 3000 ,isSelectedPrice:false},
    { min: 3000, max: 4000 ,isSelectedPrice:false},

  ];

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getdata().subscribe(data => {
      this.data = data;
    });
  }
  setSelectedData() {
    let selectedBrand = [];
    let selectedColor = [];
    let selectedPriceRange = [];

    this.data.forEach(e => {
      if (e.isSelected) {
        selectedBrand.push(e.brand);
      }
    });

    this.data.forEach(e => {
      if (e.isSelectedColor) {
        selectedColor.push(e.primaryColour);
      }
    });

    this.priceRangeList.forEach(e => {
      if(e.isSelectedPrice){
        selectedPriceRange.push(e)
      }
    })

    let reqData = { from: "leftSide", selectedBrand: selectedBrand, selectedColor: selectedColor, selectedPriceRange: selectedPriceRange }
    this.api.setSearchData(reqData)
  }

}



