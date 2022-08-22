import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../shared/book';
import { BookStoreService } from '../shared/book-store.service';

@Component({
  selector: 'bm-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {
  book?: Book;
  isbn:string ='';

  constructor(
    private bookstore: BookStoreService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    const params = this.route.snapshot.paramMap;
    this.bookstore.getSingle(params.get('isbn') || '').subscribe(b => this.book = b);
  }

  getRating(num: number) {
    return new Array(num);
  }

  removeBook() {
    if (confirm('Buch wirklich löschen?') && this.book) {
      this.bookstore.remove(this.book.isbn)
        .subscribe(res => this.router.navigate(['../'], { relativeTo: this.route}))
    }
  }

}
