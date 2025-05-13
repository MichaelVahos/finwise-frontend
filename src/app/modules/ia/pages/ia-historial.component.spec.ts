import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IaHistorialComponent } from './ia-historial.component';

describe('IaHistorialComponent', () => {
  let component: IaHistorialComponent;
  let fixture: ComponentFixture<IaHistorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IaHistorialComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IaHistorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
