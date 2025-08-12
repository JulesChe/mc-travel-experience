import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationsSectionComponent } from './accommodations-section.component';

describe('AccommodationsSectionComponent', () => {
  let component: AccommodationsSectionComponent;
  let fixture: ComponentFixture<AccommodationsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccommodationsSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccommodationsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
