import { Component, Input, OnInit } from '@angular/core';
import { Timestamp } from "firebase/firestore";
import { Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {
  @Input() hideText: boolean = false;
  @Input()
  endDate: Timestamp = new Timestamp(0, 0);
  timeLeft$!: Observable<Date>;
  timeLeft: Date = new Date()

  ngOnInit(): void {
    this.timeLeft$ = timer(0, 1000).pipe(
      map(() => {
        const now = new Date().getTime();
        const timeLeft = this.endDate.seconds * 1000 - now
        return new Date(timeLeft);     
      }),
    );

  }

  ngOnDestroy() {
  }
}
