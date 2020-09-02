import { Component, OnInit, Input } from '@angular/core';
import { Joke } from 'src/app/interfaces/note-joke';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-pagination',
  templateUrl: './list-pagination.component.html',
  styleUrls: ['./list-pagination.component.scss']
})
export class ListPaginationComponent implements OnInit {

  @Input() dataSourse: Joke[];
  @Input() isDark: boolean;
  
  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  onDetailLink(id: string){
		this.router.navigateByUrl(`joke/${id}`);
  }

}
