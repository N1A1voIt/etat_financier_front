import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputDSquareComponent } from './input-d-square.component';

describe('InputDSquareComponent', () => {
  let component: InputDSquareComponent;
  let fixture: ComponentFixture<InputDSquareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputDSquareComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputDSquareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
