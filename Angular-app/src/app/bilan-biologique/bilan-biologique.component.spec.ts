import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BilanBiologiqueComponent } from './bilan-biologique.component';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('BilanBiologiqueComponent', () => {
  let component: BilanBiologiqueComponent;
  let fixture: ComponentFixture<BilanBiologiqueComponent>;

  // Set up the testing module
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [BilanBiologiqueComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BilanBiologiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();  // Trigger change detection
  });

  // Test that the component is created
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  // Test the 'onCancel' method: It should emit the 'cancel' event
  it('should emit cancel event on cancel', () => {
    spyOn(component.cancel, 'emit'); // Spy on the emit function

    component.onCancel();  // Trigger the cancel method

    expect(component.cancel.emit).toHaveBeenCalled(); // Check if the event was emitted
  });

  // Test the 'onConfirm' method with valid selection: It should emit the 'confirm' event
  it('should emit confirm event with selected type when confirm is called', () => {
    spyOn(component.confirm, 'emit');  // Spy on the confirm event
    component.selectedType = 'Scanner';  // Set a valid type

    component.onConfirm();  // Call the confirm method

    expect(component.confirm.emit).toHaveBeenCalledWith({ type: 'Scanner' });  // Check if the correct data was emitted
    expect(component.cancel.emit).toHaveBeenCalled();  // Ensure cancel is also emitted
  });

  // Test the 'onConfirm' method with invalid selection: It should not emit the confirm event
  it('should not emit confirm event when selectedType is empty', () => {
    spyOn(component.confirm, 'emit');  // Spy on the confirm event
    spyOn(window, 'alert');  // Spy on the alert function

    component.selectedType = '';  // Set an invalid type

    component.onConfirm();  // Call the confirm method

    expect(component.confirm.emit).not.toHaveBeenCalled();  // Ensure the confirm event was not emitted
    expect(window.alert).toHaveBeenCalledWith('Veuillez remplir tous les champs avant de confirmer.');  // Ensure alert was called
  });

  // Test that the 'selectedType' is bound to the input
  it('should bind selectedType to the input element', () => {
    const inputElement = fixture.debugElement.query(By.css('select'));  // Query the <select> element
    inputElement.nativeElement.value = 'IRM';  // Set a new value for the select element
    inputElement.nativeElement.dispatchEvent(new Event('change'));  // Dispatch a change event

    fixture.detectChanges();  // Trigger change detection

    expect(component.selectedType).toBe('IRM');  // Ensure selectedType is updated
  });
});
