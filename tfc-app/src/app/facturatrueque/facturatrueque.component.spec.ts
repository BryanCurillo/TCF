import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturatruequeComponent } from './facturatrueque.component';

describe('FacturatruequeComponent', () => {
  let component: FacturatruequeComponent;
  let fixture: ComponentFixture<FacturatruequeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacturatruequeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacturatruequeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
