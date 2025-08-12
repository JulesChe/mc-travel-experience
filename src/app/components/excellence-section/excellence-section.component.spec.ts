import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcellenceSectionComponent } from './excellence-section.component';

describe('ExcellenceSectionComponent', () => {
  let component: ExcellenceSectionComponent;
  let fixture: ComponentFixture<ExcellenceSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExcellenceSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExcellenceSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
