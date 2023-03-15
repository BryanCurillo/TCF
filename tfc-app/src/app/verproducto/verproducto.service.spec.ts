import { TestBed } from '@angular/core/testing';

import { VerproductoService } from './verproducto.service';

describe('VerproductoService', () => {
  let service: VerproductoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerproductoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
