import { TestBed } from '@angular/core/testing';

import { ElonkitService } from './elonkit.service';

describe('ElonkitService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ElonkitService = TestBed.get(ElonkitService);
    expect(service).toBeTruthy();
  });
});
