import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeOrdoComponent } from './liste-ordo.component';

describe('ListeOrdoComponent', () => {
  let component: ListeOrdoComponent;
  let fixture: ComponentFixture<ListeOrdoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeOrdoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeOrdoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
