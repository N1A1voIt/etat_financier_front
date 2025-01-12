import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RubriqueAddInterfaceComponent } from './rubrique-add-interface.component';

describe('RubriqueAddInterfaceComponent', () => {
  let component: RubriqueAddInterfaceComponent;
  let fixture: ComponentFixture<RubriqueAddInterfaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RubriqueAddInterfaceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RubriqueAddInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
