import { TestBed } from '@angular/core/testing';

import { PatrymonyService } from './patrymony.service';

describe('PatrymonyService', () => {
  let service: PatrymonyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatrymonyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
