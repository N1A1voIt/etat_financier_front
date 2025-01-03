import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectRoundedComponent } from './select-rounded.component';

describe('SelectRoundedComponent', () => {
  let component: SelectRoundedComponent;
  let fixture: ComponentFixture<SelectRoundedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectRoundedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectRoundedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
