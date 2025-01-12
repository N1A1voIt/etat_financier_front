import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlterDiplomaComponent } from './alter-diploma.component';

describe('AlterDiplomaComponent', () => {
  let component: AlterDiplomaComponent;
  let fixture: ComponentFixture<AlterDiplomaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlterDiplomaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlterDiplomaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
