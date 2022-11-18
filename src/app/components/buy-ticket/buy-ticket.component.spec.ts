import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyTickectComponent } from './buy-ticket.component';

describe('BuyTickectComponent', () => {
  let component: BuyTickectComponent;
  let fixture: ComponentFixture<BuyTickectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuyTickectComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyTickectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
