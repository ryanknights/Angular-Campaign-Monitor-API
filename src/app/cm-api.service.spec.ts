import { TestBed, inject } from '@angular/core/testing';

import { CmApiService } from './cm-api.service';

describe('CmApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CmApiService]
    });
  });

  it('should ...', inject([CmApiService], (service: CmApiService) => {
    expect(service).toBeTruthy();
  }));
});
