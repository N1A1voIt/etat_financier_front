import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalComponentComponent } from './modal-component.component';

describe('ModalComponentComponent', () => {
  let component: ModalComponentComponent;
  let fixture: ComponentFixture<ModalComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
