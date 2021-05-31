import { ApiService } from './../api.service';
import { Component, Input, OnInit, Pipe, PipeTransform, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.scss']
})

export class LeftSidebarComponent implements OnInit {
  brands: string;
  data: any;
  priceRangeList = [
    { min: 0, max: 200, isSelectedPrice: false },
    { min: 200, max: 400, isSelectedPrice: false },
    { min: 400, max: 1000, isSelectedPrice: false },
    { min: 1000, max: 1500, isSelectedPrice: false },
    { min: 1500, max: 2000, isSelectedPrice: false },
    { min: 2000, max: 3000, isSelectedPrice: false },
    { min: 3000, max: 4000, isSelectedPrice: false },
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

    let reqData = { from: "leftSide", selectedBrand: selectedBrand, selectedColor: selectedColor}
    this.api.setSearchData(reqData)
  }

  @Output() selectPrice: EventEmitter<any> = new EventEmitter();
  setSelectedPrice() {
    this.selectPrice.emit(this.priceRangeList);
  }

}



