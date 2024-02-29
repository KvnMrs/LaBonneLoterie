import { Component, Input, OnInit } from '@angular/core';
import { Timestamp } from 'firebase/firestore';
import { BehaviorSubject, Observable, Subscription, map } from 'rxjs';
import { AnnouncesService } from 'src/app/services/announce/announces.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements OnInit {
  @Input() hideText? = false;
  @Input() endDate: number | undefined ;
  timer$: Observable<number> | undefined;
  timerValue = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };

  constructor(private announceService: AnnouncesService) {}

  ngOnInit(): void {
      if (this.endDate) {
        this.timer$ = this.announceService.createTimerObservable(this.endDate);
      }
  }

  ngOnDestroy(): void {
  }
  
}
