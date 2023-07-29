import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryAnnounceComponent } from './summary-announce.component';

describe('SummaryAnnounceComponent', () => {
  let component: SummaryAnnounceComponent;
  let fixture: ComponentFixture<SummaryAnnounceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SummaryAnnounceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SummaryAnnounceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
