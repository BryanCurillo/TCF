import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoOfertaComponent } from './producto-oferta.component';

describe('ProductoOfertaComponent', () => {
  let component: ProductoOfertaComponent;
  let fixture: ComponentFixture<ProductoOfertaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductoOfertaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductoOfertaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
