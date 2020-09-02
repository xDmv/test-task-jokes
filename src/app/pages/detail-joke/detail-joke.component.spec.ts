import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailJokeComponent } from './detail-joke.component';

describe('DetailJokeComponent', () => {
  let component: DetailJokeComponent;
  let fixture: ComponentFixture<DetailJokeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailJokeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailJokeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
