import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, filter, Subject, switchMap, tap } from 'rxjs';
import { Book } from '../shared/book';
import { BookStoreService } from '../shared/book-store.service';

@Component({
  selector: 'bm-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  keyUp$ = new Subject<string>();
  foundBooks: Book[] = []
  isLoading: boolean = false;

  constructor(private bookstore: BookStoreService) { }

  ngOnInit(): void {
    this.keyUp$
    .pipe(
      filter(term => term.length >= 3),
      debounceTime(500),
      distinctUntilChanged(),
      tap(() => this.isLoading = true),
      switchMap(searchTerm => this.bookstore.getAllSearch(searchTerm)),
      tap(() => this.isLoading = false),
    )
    .subscribe(books=> this.foundBooks = books);
  }

}
