import { Component, OnInit } from '@angular/core';
import { Book } from '../shared/book';
import { BookStoreService } from '../shared/book-store.service';

@Component({
  selector: 'bm-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {

  books: Book[] = [];
  areBooksinDatabase: boolean = true;

  constructor(private bookstore: BookStoreService) { }

  ngOnInit(): void {
    this.bookstore.getAll().subscribe(res => {
      this.books = res;
      if (this.books.length == 0) {
        this.areBooksinDatabase = false;
      }
    });
  }
}
