import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlterXpComponent } from './alter-xp.component';

describe('AlterXpComponent', () => {
  let component: AlterXpComponent;
  let fixture: ComponentFixture<AlterXpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlterXpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlterXpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
