import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Book } from '../shared/book';
import { BookStoreService } from '../shared/book-store.service';

@Component({
  selector: 'bm-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {

  books: Book[] = [];
  @Output() showDetailsEvent = new EventEmitter<Book>();

  constructor(private bookstore: BookStoreService) { }

  ngOnInit(): void {
    this.books = this.bookstore.getAll();
  }

  showDetails(book: Book) {
    this.showDetailsEvent.emit(book);
  }

}
