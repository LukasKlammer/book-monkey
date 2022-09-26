import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../shared/book';
import { BookStoreService } from '../shared/book-store.service';

@Component({
  selector: 'bm-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.scss']
})
export class CreateBookComponent implements OnInit {

  constructor(
    private bookstore: BookStoreService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }

  createBook(book: Book) {
    this.bookstore.create(book).subscribe(() => {
      this.router.navigate(['../..', 'books']),
      { relativeTo: this.route }
    })
  }
}
