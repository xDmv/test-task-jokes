import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, map, takeUntil } from 'rxjs/operators';
import { Joke, JokeList } from 'src/app/interfaces/note-joke';
import { ApiService } from 'src/app/services/api.service';
import { PaginationService } from 'src/app/services/pagination.service';
import { NoteJoke } from '../../interfaces/note-joke';

@Component({
  selector: 'app-list-jokes',
  templateUrl: './list-jokes.component.html',
  styleUrls: ['./list-jokes.component.scss'],
})
export class ListJokesComponent implements OnInit, OnDestroy {
  isDark: boolean;
  currentPage: number;
  totalPages: number;
  totalJokes: number;
  rangeJokes: string;
  fullJoke: Joke[];
  currentArray: Joke[];
  listJokes: Joke[]; 
  searchForm: FormGroup;
  warning: boolean;
  notFound: boolean;
  private ngUnsubscribe: Subject<void>;

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private pagination: PaginationService,
    public router: Router
  ) {
    this.ngUnsubscribe = new Subject();
  }

  ngOnInit(): void {
    this.config();
    this.getData();
    this.buildForms();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
  }

  toggleTheme(value: boolean) {
    this.pagination.setTheme(value);
  }

  config() {
    this.pagination.onInit();

    this.pagination.theme
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((value: boolean) => {
        this.isDark = value;
      });

    this.pagination.totalPages
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((value: number) => {
        this.totalPages = value;
      });

    this.pagination.currentPage
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((value: number) => {
        this.currentPage = value;
      });

      this.pagination.totalJokes
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((value: number) => {
        this.totalJokes = value;
      });

      this.pagination.rangeJokes
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((value: string) => {
        this.rangeJokes = value;
      });

      this.pagination.currentPage
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((value: number) => {
        this.currentPage = value;
      });

      this.pagination.shownJokes
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((value: Joke[]) => {
        this.listJokes = value;
      });
  }

  buildForms() {
    this.searchForm = this.formBuilder.group({
      searchString: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  getData() {
    const apiData$ = this.api
      .getAllJokes()
      .pipe(
        map((jokes: NoteJoke) => {
          return jokes.value.map((item: JokeList) => {
            return {
              id: item.id,
              text: item.joke,
            };
          });
        })
      )
      .subscribe(
        (data) => {
          this.fullJoke = data as Joke[];
          if(this.fullJoke.length < 1){
            return this.notFound = true;
          }
          this.currentArray = this.fullJoke;
          this.pagination.setAllJokes(this.fullJoke);
          this.pagination.setAfterSearchArray(this.fullJoke);
          this.pagination.onPagination(this.fullJoke);
          this.notFound = false;
        },
        (error) => {
          console.error('error ', error);
          this.notFound = true;
        }
      );
  }

  startLiveSearch() {
    if (this.searchForm.valid) {
      return this.warning = true;
    }
    this.searchForm.valueChanges.pipe(debounceTime(1500)).subscribe(() => {
        this.warning = false;
        this.currentArray = [];
        const reg = new RegExp(this.searchForm.value.searchString, 'ig');
        this.fullJoke.map((item) => {
          if (item.text.match(reg)) {
            this.currentArray.push(item);
          }
        });
        if(this.currentArray.length < 1){
          this.notFound = true;
        }
        this.pagination.setAfterSearchArray(this.currentArray);
        this.pagination.onPagination(this.currentArray);
        this.notFound = false;
      });
  }
}
