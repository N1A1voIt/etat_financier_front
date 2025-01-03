import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NInputComponent } from './n-input.component';

describe('NInputComponent', () => {
  let component: NInputComponent;
  let fixture: ComponentFixture<NInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
