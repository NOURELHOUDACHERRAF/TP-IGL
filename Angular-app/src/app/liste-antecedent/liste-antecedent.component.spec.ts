import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeAntecedentComponent } from './liste-antecedent.component';

describe('ListeAntecedentComponent', () => {
  let component: ListeAntecedentComponent;
  let fixture: ComponentFixture<ListeAntecedentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeAntecedentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeAntecedentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
