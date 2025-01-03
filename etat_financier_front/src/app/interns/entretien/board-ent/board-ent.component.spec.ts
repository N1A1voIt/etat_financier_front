import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardEntComponent } from './board-ent.component';

describe('BoardEntComponent', () => {
  let component: BoardEntComponent;
  let fixture: ComponentFixture<BoardEntComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardEntComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardEntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
