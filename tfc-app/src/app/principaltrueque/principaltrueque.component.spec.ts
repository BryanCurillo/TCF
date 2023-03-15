import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipaltruequeComponent } from './principaltrueque.component';

describe('PrincipaltruequeComponent', () => {
  let component: PrincipaltruequeComponent;
  let fixture: ComponentFixture<PrincipaltruequeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrincipaltruequeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrincipaltruequeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
