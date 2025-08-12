import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConciergerieComponent } from './conciergerie.component';

describe('ConciergerieComponent', () => {
  let component: ConciergerieComponent;
  let fixture: ComponentFixture<ConciergerieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConciergerieComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConciergerieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
