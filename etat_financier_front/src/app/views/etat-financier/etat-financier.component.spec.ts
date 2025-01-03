import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtatFinancierComponent } from './etat-financier.component';

describe('EtatFinancierComponent', () => {
  let component: EtatFinancierComponent;
  let fixture: ComponentFixture<EtatFinancierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EtatFinancierComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EtatFinancierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
