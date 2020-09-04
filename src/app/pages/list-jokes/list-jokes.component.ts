import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, map, takeUntil } from 'rxjs/operators';
import { Joke, JokeList } from 'src/app/interfaces/note-joke';
import { ApiService } from 'src/app/services/api.service';
import { StateService } from 'src/app/services/state.service';
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
    private store: StateService,
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
    // @ts-ignore
    this.store.theme = value;
  }

  config() {
    this.store.onInit();

    this.store.theme
      .pipe(
        // @ts-ignore
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((value: boolean) => {
        this.isDark = value;
      });

    this.store.totalPages
      .pipe(
        // @ts-ignore
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((value: number) => {
        this.totalPages = value;
      });

    this.store.currentPage
      .pipe(
        // @ts-ignore
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((value: number) => {
        this.currentPage = value;
      });

      this.store.totalJokes
      .pipe(
        // @ts-ignore
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((value: number) => {
        this.totalJokes = value;
      });

      this.store.rangeJokes
      .pipe(
        // @ts-ignore
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((value: string) => {
        this.rangeJokes = value;
      });

      this.store.currentPage
      .pipe(
        // @ts-ignore
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((value: number) => {
        this.currentPage = value;
      });

      this.store.shownJokes
      .pipe(
        // @ts-ignore
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
          this.currentArray = this.fullJoke;
          // @ts-ignore
          this.store.allJokes = this.fullJoke;
          // @ts-ignore
          this.store.AfterSearchArray = this.fullJoke;
          this.onPagination();
        },
        (error) => {
          console.error('error ', error);
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
        // @ts-ignore
        this.store.AfterSearchArray = this.currentArray;
        this.onPagination();
        this.notFound = false;
      });
  }

  onPagination() {
    this.store.AfterSearchArray
    .pipe(
      // @ts-ignore
      takeUntil(this.ngUnsubscribe)
    )
    .subscribe((value: Joke[]) => {
      this.currentArray = value;
      let endJoke = 0;
      if(this.currentArray.length  > 10){
        endJoke = 10;
      } else {
        endJoke = this.currentArray.length;
      }
      // @ts-ignore
      this.store.totalJokes = this.currentArray.length;
      // @ts-ignore
      this.store.totalPages = this.currentArray.length > 10 ? Math.ceil(this.currentArray.length / 10) : 1;
      // @ts-ignore
      this.store.rangeJokes = `1-${endJoke}`;
      // @ts-ignore
      this.store.currentPage = 1;
      // @ts-ignore
      this.store.shownJokes = this.currentArray.slice(0, 10);
    });
  }
}
