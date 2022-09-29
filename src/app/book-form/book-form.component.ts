import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Book, Thumbnail } from '../shared/book';
import { BookFactory } from '../shared/book-factory';

@Component({
  selector: 'bm-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit {
  bookForm: FormGroup;

  @Input() book?: Book;
  @Output() submitBook = new EventEmitter<Book>();


  constructor(private fb: FormBuilder) {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      subtitle: [''],
      isbn: ['', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(13)
      ]],
      description: [''],
      authors: this.buildAuthorsArray(['']),
      thumbnails: this.buildThumbNailsArray([
        { title: '', url: '' }
      ]),
      published: [new Date(), [Validators.required]]
    });

  }

  ngOnInit(): void {
  }

  public submitForm() {

  }

  private buildAuthorsArray(values: string[]): FormArray {
    return this.fb.array(values, Validators.required)
  }

  private buildThumbNailsArray(values: Thumbnail[]): FormArray {
    return this.fb.array(
      values.map(t => this.fb.group(t))
    )
  }

  get authors(): FormArray {
    return this.bookForm?.get('authors') as FormArray;
  }

  get thumbnails(): FormArray {
    return this.bookForm?.get('thumbnails') as FormArray;
  }

  addAuthorControl() {
    this.authors.push(this.fb.control(''));
  }

  addThumbnailControl() {
    this.thumbnails.push(
      this.fb.group( { url: '', title: '' })
    );
  }
}
