import { Injectable } from '@angular/core';
import { Book } from './book';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BookRaw } from './book-raw';
import { BookFactory } from './book-factory';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookStoreService {
  private api = 'https://api4.angular-buch.com';


  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Book[]> {
    return this.http.get<BookRaw[]>(`${this.api}/books`)
      .pipe(
        map(booksRaw => // RxJS Operator
          booksRaw.map(b => BookFactory.fromRaw(b)) // native array method map
        )
      );
  }

  getSingle(isbn: string): Observable<Book> {
    return this.http.get<BookRaw>(`${this.api}/book/${isbn})`)
      .pipe(
        map(b => BookFactory.fromRaw(b))
      );
  }

  remove(isbn: string): Observable<any> {
    return this.http.delete(
      `${this.api}/book/${isbn})`,
      { responseType: 'text' }
    );
  }
}
