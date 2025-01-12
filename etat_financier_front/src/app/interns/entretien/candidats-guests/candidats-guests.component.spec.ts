import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatsGuestsComponent } from './candidats-guests.component';

describe('CandidatsGuestsComponent', () => {
  let component: CandidatsGuestsComponent;
  let fixture: ComponentFixture<CandidatsGuestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CandidatsGuestsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidatsGuestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
