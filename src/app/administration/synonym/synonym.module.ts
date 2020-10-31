import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { SynonymListComponent } from './components/synonym-list.component';
import { SynonymEditComponent } from './components/synonym-edit/synonym-edit.component';
import { UIModule } from '../../_ui/ui.module';
import { SynonymRoutingModule } from './synonym.router'

@NgModule({
  declarations: [
    SynonymListComponent,
    SynonymEditComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    UIModule,
    SynonymRoutingModule,
  ]
})
export class SynonymModule { }
