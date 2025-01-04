import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouteTraitementComponent } from './ajoute-traitement.component';

describe('AjouteTraitementComponent', () => {
  let component: AjouteTraitementComponent;
  let fixture: ComponentFixture<AjouteTraitementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjouteTraitementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouteTraitementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
