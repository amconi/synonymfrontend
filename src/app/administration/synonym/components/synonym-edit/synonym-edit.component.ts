import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponseObject } from '@models/ResponseObject';
import { Word } from '@models/Word';
import { ToastrService } from 'ngx-toastr';
import { SynonymWord } from '../../models/SynonymWord';
import { SynonymService } from '../../services/synonym.service';
import { CreateSynonym } from '../../models/CreateSynonym'

@Component({
  selector: 'app-synonym-edit',
  templateUrl: './synonym-edit.component.html',
  styleUrls: ['./synonym-edit.component.css']
})
export class SynonymEditComponent implements OnInit {
  formWord: FormGroup;
  formSynonym: FormGroup;
  submittedFormWord = false;
  submittedFormSynonym = false;
  wordId: number;
  synonymWord: SynonymWord;
  //returnValue: ReturnObject;
  get fw() { return this.formWord.controls; } // just for easy access from template
  get fs() { return this.formSynonym.controls; }

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    public service: SynonymService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.initializeForm()
    this.wordId = this.route.snapshot.params['wordId'] || 0; // If id is not in query string set 0

    if (this.wordId > 0) { // Edit, go to backend and get some data
      this.service.find(this.wordId).subscribe((result: SynonymWord) => {
        this.synonymWord = result;
        this.formWord.patchValue(this.synonymWord)  // Store intial value of reactive form 
      },
        error => {
          this.toastr.error(error); // errors from API
        }); // Edit
    }
  }

  initializeForm() {
    this.synonymWord = new SynonymWord;
    this.synonymWord.synonyms = new Array;

    this.formWord = this.formBuilder.group({
      wordText: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(255), Validators.pattern('^[a-zA-Z]*$')]],
    })
    this.formSynonym = this.formBuilder.group({
      synonym: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(255), Validators.pattern('^[a-zA-Z]*$')]],
      synonyms: this.formBuilder.group({
        synonymId: [''],
        synonymText: [''],
      }),
    })
  }

  updateForm() {
    this.submittedFormWord = true
    if (this.formWord.invalid) {
      return;
    } // form must be valid to create request to back end

    if (this.synonymWord.synonyms.length === 0) {
      this.toastr.error('Word must have at least one synonym.');
      return;
    } // Also at least one synonym must exist

    const retWord: Word = this.formWord.value;
    retWord.wordId = this.wordId;
    this.synonymWord.wordId = 0;
    this.synonymWord.wordText = retWord.wordText

    if (this.wordId > 0) { // EDIT Word
      this.synonymWord.wordId = this.wordId
      this.editWord(this.synonymWord)
    } else { // ADD word
      this.createWord(this.synonymWord)
    }
  }

  // Post new word with synonyms to the backend and return message
  private createWord(data: SynonymWord) {
    this.service.create(data).subscribe(
      (result: ResponseObject) => {
        if (result.isError) {
          this.toastr.error(result.errorMessage);   // Show error message
        } else {
          this.toastr.success('Word is updated successfully!');   // Show succes message when data is successfully submited
          this.router.navigate(['word']); // Navigate to word grid
        }
      },
      error => {
        this.toastr.error(error); // errors from API
      });// Create user data using CRUD API
  }

  private editWord(word: SynonymWord) {
    this.service.update(word).subscribe(
      (result: ResponseObject) => {
        if (result.isError) {
          this.toastr.error(result.errorMessage);   // Show error message
        } else {
          this.toastr.success('Word is added successfully!');   // Show succes message when data is successfully submited
        }
      },
      error => {
        this.toastr.error(error); // errors from API
      });// Create user data using CRUD API
  }

  removeSynonym(id: number) { // Click on Delete
    if (this.synonymWord.synonyms.length > 1) {
      this.service.deleteSynonym(id).subscribe(
        (result: ResponseObject) => {
          this.synonymWord.synonyms = this.synonymWord.synonyms.filter(obj => obj.synonymId !== id); // remove synonym from list
        },
        error => {
          this.toastr.error(error); // errors from API
        });// Delete synonym
    } else {
      this.toastr.error('At least one synonym must exist for a word!');
    }

  }

  addSynonym() { // click on Add Synonym
    this.submittedFormSynonym = true
    if (this.formSynonym.invalid) {
      return;
    } // form must be valid to create request to back end
    const selectedName = this.formSynonym.get('synonym').value; // get entered value

    if (this.synonymWord.synonyms.length > 0) { // validation if nothing is added skip this step
      const synArray = this.synonymWord.synonyms.map(x => x.synonymText.toLowerCase());
      if (synArray.includes(selectedName?.toLowerCase())) { // check if is already added synonym 
        this.toastr.error('Synonym is already added!');
        return;
      }
    } // Validation

    if (this.wordId > 0) { // EDIT WORD --> ADD SYNONYM 
      this.addSynonymWithWord(selectedName)
    } else {
      this.synonymWord.synonyms.push({ synonymId: 0, synonymText: selectedName }) // ADD WORD - when we add synonym we set id to zero
      this.resetForm(this.formSynonym);
    }
  }

  private addSynonymWithWord(selectedName: string) { // Add synonym with wordId
    this.submittedFormSynonym = true;
    const data = new CreateSynonym();
    data.synonymText = selectedName;
    data.wordId = this.wordId;
    this.service.createSynonym(data).subscribe((result: ResponseObject) => {
      if (result.isError) {
        this.toastr.error(result.errorMessage);   // Show error message
      } else {
        this.synonymWord.synonyms.push({ synonymId: result.id, synonymText: selectedName }) // add synonym to ui
        this.submittedFormSynonym = false;
        //this.resetForm(this.formSynonym)
        this.formSynonym.get("synonym").setValue('')

        this.toastr.success('Synonym is added successfully!');   // Show succes message when data is successfully submited
      }
    },
      error => {
        this.toastr.error(error); // errors from API
      });// Create synonym using CRUD API

  }

  private resetForm(form: FormGroup) {
    form.reset();
    Object.keys(form.controls).forEach(key => {
      form.get(key).setErrors(null);
      form.get(key).markAsPristine;
      form.get(key).markAsTouched({ onlySelf: true })
    });
  }
}
