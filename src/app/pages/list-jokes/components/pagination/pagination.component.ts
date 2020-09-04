import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { PaginationService } from 'src/app/services/pagination.service';
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
    private pagination: PaginationService
  ) { 
    this.ngUnsubscribe = new Subject();
  }

  ngOnInit(): void {
    this.pagination.AfterSearchArray
    .pipe(
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
      this.pagination.setRangeJokes(`1-10`);
    } else {
      this.pagination.setRangeJokes(`${startJoke}-${endJoke}`);
    }
    this.pagination.setCurrentPage(this.currentPage - 1);
    this.pagination.setShownJokes(this.currentArray.slice(startJoke, endJoke));
  }

  onNext(){
    let startJoke = this.currentPage * 10;
    let endJoke = (this.currentPage + 1) * 10;
    if((this.currentPage+1) === (Math.ceil(this.currentArray.length / 10))){
      let end = this.currentArray.length
      this.pagination.setRangeJokes(`${startJoke}-${end}`);
    } else {
      this.pagination.setRangeJokes(`${startJoke}-${endJoke}`);
    }
    this.pagination.setCurrentPage(this.currentPage + 1);
    this.pagination.setShownJokes(this.currentArray.slice(startJoke, endJoke));
  }

  onPage(index: number){
    let startJoke = (index - 1) * 10;
    let endJoke = index * 10;
    if(index === (Math.ceil(this.currentArray.length / 10))){
      let end = this.currentArray.length
      this.pagination.setRangeJokes(`${startJoke}-${end}`);
    } else {
      this.pagination.setRangeJokes(`${startJoke}-${endJoke}`);
    }
    this.pagination.setCurrentPage(index);
    this.pagination.setShownJokes(this.currentArray.slice(startJoke, endJoke));
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
  }
  
}
