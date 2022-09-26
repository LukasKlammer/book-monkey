import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Book } from '../shared/book';
import { BookFactory } from '../shared/book-factory';

@Component({
  selector: 'bm-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit {
  book = BookFactory.empty();

  @Output() submitBook = new EventEmitter<Book>();
  @ViewChild('bookForm', { static: true}) form?: NgForm;

  constructor() { }

  ngOnInit(): void {
  }

  public submitForm() {
    this.submitBook.emit(this.book);
    this.book = BookFactory.empty();
    this.form?.reset();
  }

}
