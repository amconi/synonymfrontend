import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pager } from '@models/Pager'
@Component({
    selector: 'simple-pager',
    templateUrl: './simple-pager.component.html'
})
export class SimplePagerComponent {
    @Input() pager: Pager;
    @Input() showPageSizes: boolean = false;
    @Input() isBusy: boolean = false;// If operation is not finished user can't click on pager button

    @Output() onPageChanged = new EventEmitter<number>();
    @Output() onPageSizeChanged = new EventEmitter<number>();

    pageSizes: number[] = [10, 20, 50];
    pageSize: number;

    constructor() {
    }

    previousPage(page: number) {
        this.pager.currentPage = --page;
        this.onPageChanged.emit(page);
    }

    nextPage(page: number) {
        if (this.pager.totalPages === this.pager.currentPage) return;
        this.pager.currentPage = ++page;
        this.onPageChanged.emit(page);
    }

    firstPage() {
        this.pager.currentPage = 1;
        this.onPageChanged.emit(1);
    }

    lastPage() {
        this.pager.currentPage = this.pager.totalPages;
        this.onPageChanged.emit(this.pager.currentPage);
    }

    pageSizeChange(size: number) {
        this.pageSize = size;
        this.onPageSizeChanged.emit(size);
    }
}