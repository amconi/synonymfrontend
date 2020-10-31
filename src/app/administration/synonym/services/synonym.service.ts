import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseGrid } from '@models/ResponseGrid';
import { environment } from '@environments/environment';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { SynonymWord } from '../models/SynonymWord';
import { ResponseObject } from '@models/ResponseObject';
import { SearchResult } from '@models/SearchResult';
import { CreateSynonym } from '../models/CreateSynonym'

@Injectable({
  providedIn: 'root'
})
export class SynonymService {

  constructor(private http: HttpClient) { }

  getAll(currentPage: number): Observable<ResponseGrid<SearchResult>> {
    if (!currentPage) {
      currentPage = 1;
    }

    const params = new HttpParams({ fromObject: { pageNumber: currentPage.toString() } });

    return this.http.get<ResponseGrid<SearchResult>>(`${environment.apiUrl}/word/grid`, { params: params })
      .pipe(
        map(results => { 
          console.log(results)
          return results }),
        catchError(this.handleError)
      );

    // let res: SearchResult[] = [
    //   {
    //     wordId: 1, wordText: 'Bossy', synonyms: [
    //       { synonymText: 'controlling' },
    //       { synonymText: 'tyrannical' }
    //     ]
    //   },
    //   {
    //     wordId: 2, wordText: 'Hardworking', synonyms: [
    //       { synonymText: 'diligent' },
    //       { synonymText: 'determined' },
    //       { synonymText: 'industrious' },
    //       { synonymText: 'enterprising' }
    //     ]
    //   }
    // ];

    // let ret: ResponseGrid<SearchResult> = {
    //   data: res,
    //   isError: false,
    //   pager: new Pager
    // }
    // return of(ret);
  }

  find(wordId?: number) {
    const para = new HttpParams({ fromString: 'wordId=' + wordId.toString() });
    return this.http.get<SynonymWord>(`${environment.apiUrl}/word/edit`, { params: para }).pipe(
      map(result => { return result }),
      catchError(this.handleError)
    );
  }

  create(sw: SynonymWord): Observable<ResponseObject> {
    return this.http.post<ResponseObject>(`${environment.apiUrl}/word/create`, sw).pipe(
      map(result => { return result }),
      catchError(this.handleError)
    )
  }

  update(sw: SynonymWord): Observable<ResponseObject> {
    return this.http.put<ResponseObject>(`${environment.apiUrl}/word/update`, sw).pipe(
      map(result => { return result }),
      catchError(this.handleError)
    )
  }

  createSynonym(syn: CreateSynonym): Observable<ResponseObject> {
    return this.http.post<ResponseObject>(`${environment.apiUrl}/synonym/create`, syn).pipe(
      map(result => { return result }),
      catchError(this.handleError)
    )
  }

  deleteSynonym(synonymId: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/synonym/delete/${synonymId}`).pipe(
      catchError(this.handleError)
    )
  }

  deleteWord(wordId: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/word/delete/${wordId}`).pipe(
      catchError(this.handleError)
    )
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
