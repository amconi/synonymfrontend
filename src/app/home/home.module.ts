import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeFilterComponent } from './components/home-filter/home-filter.component';
import { UIModule } from '@app/_ui/ui.module';

@NgModule({
  declarations: [
    HomeComponent,
    HomeFilterComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UIModule,
  ]
})
export class HomeModule { }
