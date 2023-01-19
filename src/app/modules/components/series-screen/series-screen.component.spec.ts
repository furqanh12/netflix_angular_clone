import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesScreenComponent } from './series-screen.component';

describe('SeriesScreenComponent', () => {
  let component: SeriesScreenComponent;
  let fixture: ComponentFixture<SeriesScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeriesScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeriesScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
