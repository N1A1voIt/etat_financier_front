import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlterProfilComponent } from './alter-profil.component';

describe('AlterProfilComponent', () => {
  let component: AlterProfilComponent;
  let fixture: ComponentFixture<AlterProfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlterProfilComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlterProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
