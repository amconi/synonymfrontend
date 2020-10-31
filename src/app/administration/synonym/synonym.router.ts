import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SynonymEditComponent } from './components/synonym-edit/synonym-edit.component';
import { SynonymListComponent } from './components/synonym-list.component';

const routes: Routes = [
    { path: 'word', component: SynonymListComponent },
    { path: 'word/new', component: SynonymEditComponent }, // NEW
    { path: 'word/edit/:wordId', component: SynonymEditComponent }, // EDIT
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })

  export class SynonymRoutingModule { }
  