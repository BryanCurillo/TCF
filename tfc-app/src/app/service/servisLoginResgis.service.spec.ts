import { TestBed } from '@angular/core/testing';

import { ServisLoginResgisService } from './servisLoginResgis.service';

describe('ServisLoginResgisService', () => {
  let service: ServisLoginResgisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServisLoginResgisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
