import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Joke } from 'src/app/interfaces/note-joke';

@Component({
  selector: 'app-list-pagination',
  templateUrl: './list-pagination.component.html',
  styleUrls: ['./list-pagination.component.scss'],
})
export class ListPaginationComponent implements OnInit {
  @Input() dataSource: Joke[];

  constructor(public router: Router) {}

  ngOnInit(): void {}

  onDetailLink(id: number) {
    this.router.navigateByUrl(`joke/${id}`);
  }
}
