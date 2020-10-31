import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SynonymListComponent } from './administration/synonym/components/synonym-list.component';
import { HomeComponent } from './home/components/home.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'word', component: SynonymListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
