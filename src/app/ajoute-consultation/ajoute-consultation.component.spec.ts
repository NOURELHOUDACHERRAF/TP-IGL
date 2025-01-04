import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouteConsultationComponent } from './ajoute-consultation.component';

describe('AjouteConsultationComponent', () => {
  let component: AjouteConsultationComponent;
  let fixture: ComponentFixture<AjouteConsultationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjouteConsultationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouteConsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
