import { TestBed } from '@angular/core/testing';

import { EkgService } from './ekg.service';

describe('EkgService', () => {
  let service: EkgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EkgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
