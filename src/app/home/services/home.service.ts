import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { ResponseSearch } from '../models/ResponseSearch';
import { from, Observable, of, throwError } from 'rxjs';
import { HomeFilter } from '../models/HomeFilter';
@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  search(filter: HomeFilter): Observable<ResponseSearch> {
    if (!filter) {
      filter = new HomeFilter();
    }

    const { searchTerm } = filter;
    const para = new HttpParams({ fromString: 'searchTerm=' + searchTerm + '&includeTransitive=' + filter.includeTransitive });

    return this.http.get<ResponseSearch>(`${environment.apiUrl}/word/search`, { params: para })
      .pipe(
        map(result => { return result }),
        catchError(this.handleError)
      );

      // let ret: ResponseSearch = {
      //   data: [{
      //     wordId: 1, wordText: 'Bossy', synonyms: [
      //       { synonymText: 'controlling' },
      //       { synonymText: 'tyrannical' }
      //     ]
      //   }
      //   ],
      //   isError: false
      // };
      // return of(ret);
  }

  // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Code ${error.status}, ` + `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something is wrong! Please try again later.');
  };

}
