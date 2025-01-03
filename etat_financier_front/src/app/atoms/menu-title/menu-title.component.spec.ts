import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuTitleComponent } from './menu-title.component';

describe('MenuTitleComponent', () => {
  let component: MenuTitleComponent;
  let fixture: ComponentFixture<MenuTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuTitleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
