import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      let isbnFromLink = (params.get('isbn') || '' ); // Typ des Routen-Parameters ist string oder null. Methoden erwarten String, deshalb leerer String als Fallback-Wert
      this.isbn = isbnFromLink;
      this.book = this.bookstore.getSingle(isbnFromLink);
      console.log(isbnFromLink);
    });
  }

  getRating(num: number) {
    return new Array(num);
  }

}
