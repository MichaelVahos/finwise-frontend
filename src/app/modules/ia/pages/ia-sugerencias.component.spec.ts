import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IaSugerenciasComponent } from './ia-sugerencias.component';

describe('IaSugerenciasComponent', () => {
  let component: IaSugerenciasComponent;
  let fixture: ComponentFixture<IaSugerenciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IaSugerenciasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IaSugerenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
