import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';
import { NoteJoke } from '../../interfaces/note-joke';
import { PaginationService } from '../../services/pagination.service';

@Component({
  selector: 'app-detail-joke',
  templateUrl: './detail-joke.component.html',
  styleUrls: ['./detail-joke.component.scss'],
})
export class DetailJokeComponent implements OnInit {
  id: string;
  joke: string;
  isDark: boolean;
  private ngUnsubscribe: Subject<void>;

  constructor(
    private activatedRoute: ActivatedRoute,
    public router: Router,
    public api: ApiService,
    private pagination: PaginationService
  ) {
    this.ngUnsubscribe = new Subject();
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.getData(this.id);
    this.pagination.theme.pipe(takeUntil(this.ngUnsubscribe)).subscribe((value) => {
      this.isDark = value;
    });
  }

  getData(id: string) {
    this.api.getOneJoke(id).subscribe(
      (data) => {
        const note = data as NoteJoke;
        if (note.type !== 'success') {
          return this.router.navigateByUrl('**');
        }
        this.joke = note.value['joke'];
      },
      (error) => {
        console.error('error', error);
      }
    );
  }

  isSetDarkTheme(value: boolean) {
    this.pagination.setTheme(value);
  }
}
