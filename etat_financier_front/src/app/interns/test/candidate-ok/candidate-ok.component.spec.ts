import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateOkComponent } from './candidate-ok.component';

describe('CandidateOkComponent', () => {
  let component: CandidateOkComponent;
  let fixture: ComponentFixture<CandidateOkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CandidateOkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidateOkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
