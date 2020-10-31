import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { SimplePagerComponent } from './simple-pager/simple-pager.component';
import { LoaderComponent } from './loader/loader.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SimplePagerComponent,
    LoaderComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
    SimplePagerComponent,
    LoaderComponent,
  ],
  providers: [
    DatePipe,
  ]
})
export class UIModule { }
