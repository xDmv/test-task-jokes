import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { NoteJoke } from '../../interfaces/note-joke'
import { map } from 'rxjs/operators'
import { JokeList, Joke } from 'src/app/interfaces/note-joke';

@Component({
	selector: 'app-list-jokes',
	templateUrl: './list-jokes.component.html',
	styleUrls: ['./list-jokes.component.scss']
})
export class ListJokesComponent implements OnInit {

	isDark: boolean;
	search_text: string;
	current_page: number = 1;
	total_pages: number = 0;
	step_page: number = 10;
	total_jokes: number;
	start_joke: number;
	end_joke: number;
	full_joke = [];
	current_array = [];
	list_jokes = [];
	

	constructor(
		private api: ApiService,
		public router: Router
	) { }

	ngOnInit(): void {
		this.themeColor(localStorage.getItem('ThemeColor'));
		this.getData();
	}

	getData(){
		this.api.getAlljakes()
		.pipe(
			map(
				(jokes: NoteJoke) => {
					return jokes.value.map(
						(item: JokeList) => {
							return {
								'id': item.id,
								'text': item.joke
							}
						}
					)
				}
			)
		)
		.subscribe(
		(data) => {
			console.log('data: ', data);
			this.full_joke = data as Joke[];
			this.current_array = this.full_joke;
			this.onPagination();
			
			// this.total_jokes = this.full_joke.length;
			// this.start_joke = 1;
			// this.end_joke = 10;
			// this.current_page = 1;
			// this.total_pages = Math.ceil(this.full_joke.length/10);
			// this.current_array = this.full_joke;
		},
		(error) => {
			console.log('error ', error);
		}
		)
	}

	themeColor(val: string){
		if(val === 'dark'){
			this.isDark = true;
			localStorage.setItem('ThemeColor', 'dark')
			return
		}		
		localStorage.setItem('ThemeColor', 'ligth')
		this.isDark = false;
	}

	onDetailLink(id: string){
		this.router.navigateByUrl(`joke/${id}`);
	}

	onSearch(){
		this.current_array = []
		let reg = new RegExp(this.search_text, 'i')
		this.full_joke.map(
			(item)=>{
				if((item.text).match(reg)){
					this.current_array.push(item);
				}
			}
		)
		this.onPagination();
	}

	onPagination(){
		this.list_jokes = []
		this.total_jokes = this.current_array.length;
		this.start_joke = 1;
		this.end_joke = 10;
		this.current_page = 1;
		this.total_pages = Math.ceil(this.current_array.length/10)
		this.list_jokes = this.current_array.slice(0, 10);
	}

	onPrev(){
		this.start_joke = (this.current_page-2)*10;
		this.end_joke = (this.current_page-1)*10;
		this.current_page = this.current_page-1;
		this.list_jokes = this.current_array.slice(this.start_joke, this.end_joke);
	}

	onNext(){
		this.start_joke = (this.current_page)*10;
		this.end_joke = (this.current_page+1)*10;
		this.current_page = this.current_page+1;
		this.list_jokes = this.current_array.slice(this.start_joke, this.end_joke);
	}

	onPage(indx: number){
		this.start_joke = (indx-1)*10;
		this.end_joke = indx*10;
		this.current_page = indx;
		this.list_jokes = this.current_array.slice(this.start_joke, this.end_joke);
	}

}
