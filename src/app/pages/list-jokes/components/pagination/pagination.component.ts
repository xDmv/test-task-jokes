import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { StateService } from 'src/app/services/state.service';
import { Joke } from '../../../../interfaces/note-joke';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnDestroy {

  @Input() totalPages: number;
  @Input() currentPage: number;
  @Input() totalJokes: number;
  @Input() rangeJokes: string;
  @Input() isTheme: boolean;

  currentArray: Joke[];

  private ngUnsubscribe: Subject<void>;

  constructor(
    private store: StateService
  ) { 
    this.ngUnsubscribe = new Subject();
  }

  ngOnInit(): void {
    this.store.AfterSearchArray
    .pipe(
      // @ts-ignore
      takeUntil(this.ngUnsubscribe)
    )
    .subscribe((value: Joke[]) => {
      this.currentArray = value;
    });
  }

  onPrev(){
    let startJoke = (this.currentPage - 2) * 10;
    let endJoke = (this.currentPage - 1) * 10;
    if((this.currentPage) === 2){
      // @ts-ignore
      this.store.rangeJokes = `1-10`;
    } else {
      // @ts-ignore
      this.store.rangeJokes = `${startJoke}-${endJoke}`;
    }
    // @ts-ignore
    this.store.currentPage = this.currentPage - 1;
    // @ts-ignore
    this.store.shownJokes = this.currentArray.slice(startJoke, endJoke)
  }

  onNext(){
    let startJoke = this.currentPage * 10;
    let endJoke = (this.currentPage + 1) * 10;
    if((this.currentPage) === (Math.ceil(this.currentArray.length / 10))){
      let end = this.currentArray.length
      // @ts-ignore
      this.store.rangeJokes = `${startJoke}-${end}`;
    } else {
      // @ts-ignore
      this.store.rangeJokes = `${startJoke}-${endJoke}`;
    }
    // @ts-ignore
    this.store.currentPage = this.currentPage + 1;
    // @ts-ignore
    this.store.shownJokes = this.currentArray.slice(startJoke, endJoke)
  }

  onPage(index: number){
    let startJoke = (index - 1) * 10;
    let endJoke = index * 10;
    // @ts-ignore
    this.store.currentPage = index;
    // @ts-ignore
    this.store.shownJokes = this.currentArray.slice(startJoke, endJoke);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
  }
  
}
