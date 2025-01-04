import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutePrescriptionComponent } from './ajoute-prescription.component';

describe('AjoutePrescriptionComponent', () => {
  let component: AjoutePrescriptionComponent;
  let fixture: ComponentFixture<AjoutePrescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjoutePrescriptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjoutePrescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
