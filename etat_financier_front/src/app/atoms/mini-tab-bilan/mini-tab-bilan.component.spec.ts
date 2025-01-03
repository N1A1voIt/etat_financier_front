import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniTabBilanComponent } from './mini-tab-bilan.component';

describe('MiniTabBilanComponent', () => {
  let component: MiniTabBilanComponent;
  let fixture: ComponentFixture<MiniTabBilanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiniTabBilanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiniTabBilanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
