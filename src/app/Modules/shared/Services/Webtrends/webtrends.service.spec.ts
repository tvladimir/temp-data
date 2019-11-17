import { TestBed } from '@angular/core/testing';

import { WebtrendsService } from './webtrends.service';

describe('WebtrendsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WebtrendsService = TestBed.get(WebtrendsService);
    expect(service).toBeTruthy();
  });
});
