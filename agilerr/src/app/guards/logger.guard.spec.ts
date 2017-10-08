import { TestBed, async, inject } from '@angular/core/testing';

import { LoggerGuard } from './logger.guard';

describe('LoggerGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoggerGuard]
    });
  });

  it('should ...', inject([LoggerGuard], (guard: LoggerGuard) => {
    expect(guard).toBeTruthy();
  }));
});
