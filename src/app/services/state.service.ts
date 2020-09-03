import { Injectable } from '@angular/core';
import { Joke } from '../interfaces/note-joke';
import { Observable, Subject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private isTheme$: Subject<string>;
  private allJokes: Joke[];
  private afterSearchArray : Joke[];
  private shownJokes: Joke[];
  private totalPages: number;
  private totalJokes: number;
  private rangeJokes: string;

  private lastUpdateData: number;

  constructor() { }

  set theme(value: string) {
    this.isTheme$.next(value);
  }

  get theme(): Observable<string> {
    return this.isTheme$.asObservable();
  }

  setallJokes(value: Joke[]) {
    this.allJokes = value;
  }

  getallJokes() {
    return this.allJokes;
  }

  setAfterSearchArray(value: Joke[]) {
    this.afterSearchArray = value;
  }

  getAfterSearchArray() {
    return this.afterSearchArray;
  }

  setshownJokes(value: Joke[]) {
    this.shownJokes = value;
  }

  getshownJokes() {
    return this.shownJokes;
  }

  settotalPages(value: number) {
    this.totalPages = value;
  }

  gettotalPages() {
    return this.totalPages;
  }
  
  settotalJokes(value: number) {
    this.totalJokes = value;
  }

  gettotalJokes() {
    return this.totalJokes;
  }

  setrangeJokes(value: string) {
    this.rangeJokes = value;
  }

  getrangeJokes() {
    return this.rangeJokes;
  }

}
