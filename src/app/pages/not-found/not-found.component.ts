import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { StateService } from '../../services/state.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent implements OnInit, OnDestroy {
  isDark: boolean;
  private ngUnsubscribe: Subject<void>;

  constructor(private store: StateService) {
    this.ngUnsubscribe = new Subject();
  }

  ngOnInit(): void {
    this.store.theme
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((value: boolean) => {
        this.isDark = value;
      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
  }
}
