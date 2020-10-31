import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SynonymListComponent } from './synonym-list.component';

describe('SynonymListComponent', () => {
  let component: SynonymListComponent;
  let fixture: ComponentFixture<SynonymListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SynonymListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SynonymListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
