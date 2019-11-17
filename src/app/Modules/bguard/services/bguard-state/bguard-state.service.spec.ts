import { TestBed } from '@angular/core/testing';

import { BguardStateService } from './bguard-state.service';

describe('BguardStateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BguardStateService = TestBed.get(BguardStateService);
    expect(service).toBeTruthy();
  });
});
