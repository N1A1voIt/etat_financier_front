import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninrespComponent } from './signinresp.component';

describe('SigninrespComponent', () => {
  let component: SigninrespComponent;
  let fixture: ComponentFixture<SigninrespComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SigninrespComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SigninrespComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
