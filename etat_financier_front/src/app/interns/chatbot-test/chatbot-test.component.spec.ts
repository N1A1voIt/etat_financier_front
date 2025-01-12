import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatbotTestComponent } from './chatbot-test.component';

describe('ChatbotTestComponent', () => {
  let component: ChatbotTestComponent;
  let fixture: ComponentFixture<ChatbotTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatbotTestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatbotTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
