import { Component, OnInit } from '@angular/core';
import { HomeFilter } from '../models/HomeFilter';
import { ResponseSearch } from '../models/ResponseSearch';
import { SearchResult } from '@models/SearchResult';
import { HomeService } from '../services/home.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit {
  showLoading: boolean = false;
  filter: HomeFilter;
  searchResults: SearchResult[];
  emptyResult: boolean = false

  constructor(
    private service: HomeService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  filterWords(filter: HomeFilter) {
    this.filter = filter;
    this.getSearchResult(filter);
  } // click on filter button

  clearResults() {
    this.searchResults = []
  } // click on clear button

  private getSearchResult(filter: HomeFilter) {
    this.showLoading = true;
    this.service.search(filter)
      .subscribe((result: ResponseSearch) => {
        this.searchResults = result.data;
        this.showLoading = false;
        this.emptyResult = result == null || result.data.length === 0;
      },
        error => {
          this.toastr.error(error); // user friendly errors from API
          this.showLoading = false;
        });
  } // return data for grid

}
