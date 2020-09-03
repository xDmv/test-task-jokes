import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { NoteJoke } from '../../interfaces/note-joke';
import { map } from 'rxjs/operators';
import { JokeList, Joke } from 'src/app/interfaces/note-joke';

@Component({
  selector: 'app-list-jokes',
  templateUrl: './list-jokes.component.html',
  styleUrls: ['./list-jokes.component.scss'],
})
export class ListJokesComponent implements OnInit {
  isDark: boolean;
  searchText: string;
  currentPage: number;
  totalPages: number;
  totalJokes: number;
  startJoke: number;
  endJoke: number;
  fullJoke = [];
  currentArray = [];
  listJokes = [];

  constructor(private api: ApiService, public router: Router) {}

  ngOnInit(): void {
    this.themeColor(localStorage.getItem('ThemeColor'));
    this.getData();
  }

  getData() {
    this.api
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
          this.onPagination();
        },
        (error) => {
          console.error('error ', error);
        }
      );
  }

  themeColor(val: string) {
    if (val === 'dark') {
      this.isDark = true;
      localStorage.setItem('ThemeColor', 'dark');
      return;
    }
    localStorage.setItem('ThemeColor', 'light');
    this.isDark = false;
  }

  onSearch() {
    this.currentArray = [];
    const reg = new RegExp(this.searchText, 'i');
    this.fullJoke.map((item) => {
      if (item.text.match(reg)) {
        this.currentArray.push(item);
      }
    });
    this.onPagination();
  }

  onPagination() {
    this.listJokes = [];
    this.totalJokes = this.currentArray.length;
    this.startJoke = 1;
    this.endJoke = 10;
    this.currentPage = 1;
    this.totalPages = Math.ceil(this.currentArray.length / 10);
    this.listJokes = this.currentArray.slice(0, 10);
  }

  onPrev() {
    this.startJoke = (this.currentPage - 2) * 10;
    this.endJoke = (this.currentPage - 1) * 10;
    this.currentPage = this.currentPage - 1;
    this.listJokes = this.currentArray.slice(this.startJoke, this.endJoke);
  }

  onNext() {
    this.startJoke = this.currentPage * 10;
    this.endJoke = (this.currentPage + 1) * 10;
    this.currentPage = this.currentPage + 1;
    this.listJokes = this.currentArray.slice(this.startJoke, this.endJoke);
  }

  onPage(index: number) {
    this.startJoke = (index - 1) * 10;
    this.endJoke = index * 10;
    this.currentPage = index;
    this.listJokes = this.currentArray.slice(this.startJoke, this.endJoke);
  }
}
