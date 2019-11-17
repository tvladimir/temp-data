import { TestBed } from '@angular/core/testing';

import { LoggerApiService } from './logger-api.service';

describe('LoggerApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoggerApiService = TestBed.get(LoggerApiService);
    expect(service).toBeTruthy();
  });
});
