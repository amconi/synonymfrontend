import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Pager } from '@models/Pager'
import { Synonym } from '@models/Synonym';
import { SearchResult } from '@models/SearchResult';
import { ResponseGrid } from '@models/ResponseGrid'
import { SynonymService } from '../services/synonym.service'
import { ResponseObject } from '@models/ResponseObject';

@Component({
  selector: 'synonym-list',
  templateUrl: './synonym-list.component.html',
  styleUrls: ['./synonym-list.component.css']
})

export class SynonymListComponent implements OnInit {
  pageNumber: number;
  pager: Pager;
  showLoading: boolean = true;
  isSelectable: boolean;
  synonymGrid: SearchResult[];

  constructor(
    private service: SynonymService,
    private toastr: ToastrService,
    public router: Router) {
  }

  ngOnInit() {
    this.pager = new Pager;
    this.pageNumber = this.pager.currentPage;
    this.getSynonyms(this.pageNumber)
  }
  
  onPageChanged(newPage: number) {
    this.pageNumber = newPage;
    this.getSynonyms(newPage);
  }

  private getSynonyms(currentPage?: number) {
    this.service.getAll(currentPage)
      .subscribe((result: ResponseGrid<SearchResult>) => {
        this.processResponseGrid(result);
        this.showLoading = false; //chain
      },
        error => {
          this.toastr.error(error); // errors from API
          this.showLoading = false;
        });
  } // return Synonyms

  private processResponseGrid(result: ResponseGrid<SearchResult>): void {
    if (!result.isError) { // map data
      this.synonymGrid = result.data;
      this.pager = result.pager;
      
    } else {
      this.toastr.error('Something gone wrong!');   // Show error message
    }
  }

  deleteWord(id: number) {
    this.service.deleteWord(id).subscribe(
      (result: ResponseObject) => {
        this.toastr.success('Successfully deleted word!');
        this.getSynonyms(1) // reset grid or stay with this.pageNumber
      },
      error => {
        this.toastr.error(error); // errors from API
      });// Delete synonym
  }

  formatTableCell(syn: Synonym[]): string {
    return syn.map(o => o.synonymText).join(", ");
  }

  onPageSizeChanged(newSize: number) {
    this.pageNumber = newSize;
  } // not in use

}
