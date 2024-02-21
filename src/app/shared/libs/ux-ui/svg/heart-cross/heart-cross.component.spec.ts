import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeartCrossComponent } from './heart-cross.component';

describe('HeartCrossComponent', () => {
  let component: HeartCrossComponent;
  let fixture: ComponentFixture<HeartCrossComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeartCrossComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeartCrossComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
