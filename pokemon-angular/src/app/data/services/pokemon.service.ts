import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from '../../../../node_modules/rxjs/dist/types';
import { catchError, finalize, map, tap } from '../../../../node_modules/rxjs/dist/types/operators';

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: { name: string; url: string }[];
}

export interface PokemonDetail {
  id: number;
  name: string;
  sprites: { front_default: string };
  // Adicione outros campos conforme necessário
}

@Injectable({ providedIn: 'root' })
export class PokemonService {
  private readonly apiUrl = 'https://pokeapi.co/api/v2/pokemon';

  private loadingSubject = new BehaviorSubject<boolean>(false);
  private dataSubject = new BehaviorSubject<PokemonListResponse>({ count: 0, next: null, previous: null, results: [] });
  private errorSubject = new BehaviorSubject<string | null>(null);

  loading$ = this.loadingSubject.asObservable();
  data$ = this.dataSubject.asObservable();
  error$ = this.errorSubject.asObservable();

  constructor(private http: HttpClient) {}

  getPokemonList(page: number = 1, pageSize: number = 20, search?: string): void {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);
    let params = new HttpParams()
      .set('offset', ((page - 1) * pageSize).toString())
      .set('limit', pageSize.toString());
    this.http.get<PokemonListResponse>(this.apiUrl, { params })
      .pipe(
        map(res => {
          if (search) {
            res.results = res.results.filter(p => p.name.includes(search.toLowerCase()));
            res.count = res.results.length;
          }
          return res;
        }),
        tap(data => this.dataSubject.next(data)),
        catchError((error: HttpErrorResponse) => {
          this.errorSubject.next(error.message);
          this.dataSubject.next({ count: 0, next: null, previous: null, results: [] });
          return of({ count: 0, next: null, previous: null, results: [] });
        }),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe();
  }

  getPokemonDetail(nameOrId: string | number): void {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);
    this.http.get<PokemonDetail>(`${this.apiUrl}/${nameOrId}`)
      .pipe(
        tap(data => {
          // Aqui você pode criar um novo subject para detalhes, se quiser
          // ou emitir detalhes de outra forma
        }),
        catchError((error: HttpErrorResponse) => {
          this.errorSubject.next(error.message);
          return of(null);
        }),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe();
  }
} 