import { Injectable } from '@angular/core';
import { Joke } from '../interfaces/note-joke';
import { Observable, ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  private isConfigured: boolean;
  private isThemeDark$: Subject<boolean>;
  private allJokes$: Subject<Joke[]>;
  private afterSearchArray$: Subject<Joke[]>;
  private shownJokes$: Subject<Joke[]>;
  private totalPages$: Subject<number>;
  private totalJokes$: Subject<number>;
  private rangeJokes$: Subject<string>;
  private currentPage$: Subject<number>;
  private lastUpdateData: number;

  constructor() {
    this.isThemeDark$ = new ReplaySubject(1);
    this.allJokes$ = new ReplaySubject(1);
    this.afterSearchArray$ = new ReplaySubject(1);
    this.shownJokes$ = new ReplaySubject(1);
    this.totalJokes$ = new ReplaySubject(1);
    this.totalPages$ = new ReplaySubject(1);
    this.rangeJokes$ = new ReplaySubject(1);
    this.currentPage$ = new ReplaySubject(1);
  }

  setTheme(value: boolean) {
    const themeSiDark = value ? '1' : '0';
    localStorage.setItem('isThemeDark', themeSiDark);
    this.isThemeDark$.next(value);
  }

  get theme(): Observable<boolean> {
    let value = localStorage.getItem('isThemeDark')=== '1' ? true : false;
    this.setTheme(value)
    return this.isThemeDark$.asObservable();
  }


  setAllJokes(value: Joke[]) {
    this.allJokes$.next(value);
  }

  get allJokes(): Observable<Joke[]> {
    return this.allJokes$.asObservable();
  }

  setAfterSearchArray(value: Joke[]) {
    this.afterSearchArray$.next(value);
  }

  get AfterSearchArray(): Observable<Joke[]> {
    return this.afterSearchArray$.asObservable();
  }

  setShownJokes(value: Joke[]) {
    this.shownJokes$.next(value);
  }

  get shownJokes(): Observable<Joke[]> {
    return this.shownJokes$.asObservable();
  }

  setTotalPages(value: number) {
    this.totalPages$.next(value);
  }

  get totalPages(): Observable<number> {
    return this.totalPages$.asObservable();
  }

  setTotalJokes(value: number) {
    this.totalJokes$.next(value);
  }

  get totalJokes(): Observable<number> {
    return this.totalJokes$.asObservable();
  }

  setRangeJokes(value: string) {
    this.rangeJokes$.next(value);
  }

  get rangeJokes(): Observable<string> {
    return this.rangeJokes$.asObservable();
  }

  setCurrentPage(value: number) {
    this.currentPage$.next(value);
  }

  get currentPage(): Observable<number> {
    return this.currentPage$.asObservable();
  }

  onInit() {
    if (!this.isConfigured) {
      this.isThemeDark$.next(true);
      this.totalPages$.next(0);
      this.totalJokes$.next(0);
      this.rangeJokes$.next('0-0');
      this.currentPage$.next(0);
      this.shownJokes$.next([]);
      this.isConfigured = true;
    }
  }

  onPagination(value: Joke[]) {
    const currentArray = value;
    let endJoke;
    if(currentArray.length  > 10){
      endJoke = 10;
    } else {
      endJoke = currentArray.length;
    }
    let allpage = currentArray.length > 10 ? Math.ceil(currentArray.length / 10) : 1;
    this.setTotalJokes(currentArray.length);
    this.setTotalPages(allpage);
    this.setCurrentPage(1);
    this.setRangeJokes(`1-${endJoke}`);
    this.setShownJokes(currentArray.slice(0, endJoke)); 
  }
}
