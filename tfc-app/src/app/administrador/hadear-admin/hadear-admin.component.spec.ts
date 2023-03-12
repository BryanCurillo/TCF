import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HadearAdminComponent } from './hadear-admin.component';

describe('HadearAdminComponent', () => {
  let component: HadearAdminComponent;
  let fixture: ComponentFixture<HadearAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HadearAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HadearAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
