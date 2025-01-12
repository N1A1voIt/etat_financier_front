import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidaturesDetailsComponent } from './candidatures-details.component';

describe('CandidaturesDetailsComponent', () => {
  let component: CandidaturesDetailsComponent;
  let fixture: ComponentFixture<CandidaturesDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CandidaturesDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidaturesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
