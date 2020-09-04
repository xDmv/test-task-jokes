import { Injectable } from '@angular/core';
import { Joke } from '../interfaces/note-joke';
import { Observable, ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StateService {
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
  // @ts-ignore
  set theme(value: boolean) {
    this.isThemeDark$.next(value);
  }
  // @ts-ignore
  get theme(): Observable<boolean> {
    return this.isThemeDark$.asObservable();
  }
  // @ts-ignore
  set allJokes(value: Joke[]) {
    this.allJokes$.next(value);
  }
  // @ts-ignore
  get allJokes(): Observable<Joke[]> {
    return this.allJokes$.asObservable();
  }
  // @ts-ignore
  set AfterSearchArray(value: Joke[]) {
    this.afterSearchArray$.next(value);
  }
  // @ts-ignore
  get AfterSearchArray(): Observable<Joke[]> {
    return this.afterSearchArray$.asObservable();
  }
  // @ts-ignore
  set shownJokes(value: Joke[]) {
    this.shownJokes$.next(value);
  }
  // @ts-ignore
  get shownJokes(): Observable<Joke[]> {
    return this.shownJokes$.asObservable();
  }
  // @ts-ignore
  set totalPages(value: number) {
    this.totalPages$.next(value);
  }
  // @ts-ignore
  get totalPages(): Observable<number> {
    return this.totalPages$.asObservable();
  }
  // @ts-ignore
  set totalJokes(value: number) {
    this.totalJokes$.next(value);
  }
  // @ts-ignore
  get totalJokes(): Observable<number> {
    return this.totalJokes$.asObservable();
  }
  // @ts-ignore
  set rangeJokes(value: string) {
    this.rangeJokes$.next(value);
  }
  // @ts-ignore
  get rangeJokes(): Observable<string> {
    return this.rangeJokes$.asObservable();
  }
  // @ts-ignore
  set currentPage(value: number) {
    this.currentPage$.next(value);
  }
  // @ts-ignore
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
}
