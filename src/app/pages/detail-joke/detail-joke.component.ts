import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { NoteJoke } from '../../interfaces/note-joke';

@Component({
  selector: 'app-detail-joke',
  templateUrl: './detail-joke.component.html',
  styleUrls: ['./detail-joke.component.scss'],
})
export class DetailJokeComponent implements OnInit {
  id: string;
  joke: string;
  isDark: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    public router: Router,
    public api: ApiService
  ) {}

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.getData(this.id);
    this.themeColor(localStorage.getItem('ThemeColor'));
  }

  getData(id: string) {
    this.api.getOneJoke(id).subscribe(
      (data) => {
        const note = data as NoteJoke;
        if (note.type !== 'success') {
          return this.router.navigateByUrl('**');
        }
        this.joke = note.value[0].joke;
      },
      (error) => {
        console.error('error', error);
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
}
