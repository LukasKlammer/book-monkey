import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Book, Thumbnail } from '../shared/book';

@Component({
  selector: 'bm-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit {
  bookForm: FormGroup;

  @Input() book?: Book;

  /** Hier wird Setter verwendet:
   * bei jeder Änderung von 'this.editing' wird Funktion ausgeführt.
   * ISBN-Feld wird aktiviert / deaktiviert, abhängig vom Zustand
   * Control mit Name 'isbn' existiert --> deshalb Non-Null Assertion möglich
 */
  @Input() set editing(isEditing: boolean) {
    const isbnControl = this.bookForm.get('isbn')!;
    if (isEditing) {
      isbnControl.disable();
    } else {
      isbnControl.enable();
    }
  }
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

  ngOnChanges(): void {
    if (this.book) {
      this.setFormValues(this.book);
    }
  }

  private setFormValues(book: Book) {
    this.bookForm.patchValue(book);

    this.bookForm.setControl(
      'authors',
      this.buildAuthorsArray(book.authors)
    )

    if (book.thumbnails) {
      this.bookForm.setControl(
        'thumbnails',
        this.buildThumbNailsArray(book.thumbnails),
      )
    }
  }

  public submitForm() {
    const formValue = this.bookForm.value;

    const authors = formValue.authors.filter((author: string) => author);
    const thumbnails = formValue.thumbnails.filter((thumbnail: Thumbnail) => thumbnail.url)

    const newBook: Book = {
      ...formValue,
      authors,
      thumbnails
    }

    this.submitBook.emit(newBook);
    this.bookForm.reset();
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
      this.fb.group({ url: '', title: '' })
    );
  }
}
