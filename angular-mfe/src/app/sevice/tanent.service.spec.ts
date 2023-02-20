import { TestBed } from '@angular/core/testing';

import { TanentService } from './tanent.service';

describe('TanentService', () => {
  let service: TanentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TanentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
