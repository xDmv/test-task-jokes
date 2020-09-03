import { Injectable } from '@angular/core';
import { StateService } from './state.service';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  constructor(
    private store: StateService
  ) { }

  // onPagination() {
  //   let 
  //   this.totalJokes = this.currentArray.length;
  //   this.startJoke = 1;
  //   this.endJoke = 10;
  //   this.currentPage = 1;
  //   this.totalPages = Math.ceil(this.currentArray.length / 10);
  //   this.listJokes = this.currentArray.slice(0, 10);
  // }

  // onPrev() {
  //   this.startJoke = (this.currentPage - 2) * 10;
  //   this.endJoke = (this.currentPage - 1) * 10;
  //   this.currentPage = this.currentPage - 1;
  //   this.listJokes = this.currentArray.slice(this.startJoke, this.endJoke);
  // }

  // onNext() {
  //   this.startJoke = this.currentPage * 10;
  //   this.endJoke = (this.currentPage + 1) * 10;
  //   this.currentPage = this.currentPage + 1;
  //   this.listJokes = this.currentArray.slice(this.startJoke, this.endJoke);
  // }

  // onPage(index: number) {
  //   this.startJoke = (index - 1) * 10;
  //   this.endJoke = index * 10;
  //   this.currentPage = index;
  //   this.listJokes = this.currentArray.slice(this.startJoke, this.endJoke);
  // }

}
