import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriasGraficoComponent } from './categorias-grafico.component';

describe('CategoriasGraficoComponent', () => {
  let component: CategoriasGraficoComponent;
  let fixture: ComponentFixture<CategoriasGraficoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriasGraficoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriasGraficoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
