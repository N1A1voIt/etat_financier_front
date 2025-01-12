import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BilanComponent } from './bilan.component';

describe('BilanComponent', () => {
  let component: BilanComponent;
  let fixture: ComponentFixture<BilanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BilanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BilanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
