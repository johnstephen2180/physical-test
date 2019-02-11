import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryTestAllComponent } from './history-test-all.component';

describe('HistoryTestAllComponent', () => {
  let component: HistoryTestAllComponent;
  let fixture: ComponentFixture<HistoryTestAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryTestAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryTestAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
