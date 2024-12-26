import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadiographyComponent } from './radiography.component';

describe('RadiographyComponentComponent', () => {
  let component: RadiographyComponent;
  let fixture: ComponentFixture<RadiographyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadiographyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RadiographyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
