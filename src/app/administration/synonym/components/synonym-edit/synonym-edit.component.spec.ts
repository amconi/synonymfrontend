import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SynonymEditComponent } from './synonym-edit.component';

describe('SynonymEditComponent', () => {
  let component: SynonymEditComponent;
  let fixture: ComponentFixture<SynonymEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SynonymEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SynonymEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
