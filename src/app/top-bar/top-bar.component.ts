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

  constructor(private api: ApiService) {
  }

  ngOnInit(): void {
    this.api.getdata().subscribe(data => {
      this.data = data;
    });
    console.log(this.data)
    this.data = this.data
  }

  setSearchData() {
    this.api.setSearchData(this.searchData);
    
  }
}

