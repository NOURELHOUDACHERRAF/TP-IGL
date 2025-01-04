import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouteAntecedentComponent } from './ajoute-antecedent.component';

describe('AjouteAntecedentComponent', () => {
  let component: AjouteAntecedentComponent;
  let fixture: ComponentFixture<AjouteAntecedentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjouteAntecedentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouteAntecedentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
