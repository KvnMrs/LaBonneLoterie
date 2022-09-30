import { TestBed } from '@angular/core/testing';

import { AnouncesService } from './anounces.service';

describe('AnouncesService', () => {
  let service: AnouncesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnouncesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
