import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UploadRadioComponent } from './upload-radio.component';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import { FileUploadModule } from '@iplab/ngx-file-upload';


describe('UploadRadioComponent', () => {
  let component: UploadRadioComponent;
  let fixture: ComponentFixture<UploadRadioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, FileUploadModule ], // Import required modules
      declarations: [UploadRadioComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
