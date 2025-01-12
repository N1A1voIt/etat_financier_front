import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatFinauxComponent } from './candidat-finaux.component';

describe('CandidatFinauxComponent', () => {
  let component: CandidatFinauxComponent;
  let fixture: ComponentFixture<CandidatFinauxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CandidatFinauxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidatFinauxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
