import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupStep2Component } from './signup-step2.component';

describe('SignupStep2Component', () => {
  let component: SignupStep2Component;
  let fixture: ComponentFixture<SignupStep2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignupStep2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupStep2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
