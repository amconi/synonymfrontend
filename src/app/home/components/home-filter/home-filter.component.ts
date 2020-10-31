import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, RequiredValidator, Validators } from '@angular/forms';
import { HomeFilter } from '../../models/HomeFilter'
@Component({
  selector: 'home-filter',
  templateUrl: './home-filter.component.html',
  styleUrls: ['./home-filter.component.css']
})
/**
 * Here we create a search for the home page
 */
export class HomeFilterComponent implements OnInit {
  filterForm: FormGroup;
  submitted = false;
  get f() { return this.filterForm.controls; }

  @Output() onSubmit = new EventEmitter<HomeFilter>();
  @Output() onClear = new EventEmitter();

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initializeFilterForm()
  }

  initializeFilterForm() {
    this.filterForm = this.formBuilder.group({
      searchTerm: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(255), Validators.pattern('^[a-zA-Z ]*$')]),
      includeTransitive: new FormControl(''),
    })
  }; // init. search form and set "silent" validations, don't go at the backend

  clearForm() {
    this.filterForm.patchValue({ searchTerm: '' }); // empty search field

    this.onClear.emit();
  } // empty search filed and emit an event

  submitForm(values: any) {
    this.submitted = true;
    
    if (this.filterForm.invalid) {
      this.onClear.emit(); // clear search
      return;
    } // form must be valid to create request to back end

    const filter = new HomeFilter();
    filter.searchTerm = values && values.searchTerm ? values.searchTerm : "";
    filter.includeTransitive = values && values.includeTransitive ? values.includeTransitive : false;

    this.onSubmit.emit(filter);
  }

}
