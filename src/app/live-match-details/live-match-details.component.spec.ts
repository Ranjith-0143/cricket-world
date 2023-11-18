import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveMatchDetailsComponent } from './live-match-details.component';

describe('LiveMatchDetailsComponent', () => {
  let component: LiveMatchDetailsComponent;
  let fixture: ComponentFixture<LiveMatchDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LiveMatchDetailsComponent]
    });
    fixture = TestBed.createComponent(LiveMatchDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
