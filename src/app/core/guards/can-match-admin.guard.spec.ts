import { TestBed } from '@angular/core/testing';
import { CanMatchFn } from '@angular/router';

import { canMatchAdminGuard } from './can-match-admin.guard';

describe('canMatchAdminGuard', () => {
  const executeGuard: CanMatchFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => canMatchAdminGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
