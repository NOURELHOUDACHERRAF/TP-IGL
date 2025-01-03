import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-upload-radio',
  standalone: true,
  templateUrl: './upload-radio.component.html',
  styleUrls: ['./upload-radio.component.css'],
  imports: [CommonModule]
})
export class UploadRadioComponent {
  selectedFiles: File[] = [];  // Array to store selected files

  // Event emitter to send selected files to parent component
  @Output() fileSelected = new EventEmitter<File[]>();

  // Method to handle file input changes
  onFileChange(event: any) {
    const files = event.target.files;
    if (files) {
      // Convert the FileList to an array and merge it with the existing selected files
      const newFiles: File[] = Array.from(files);
      this.selectedFiles = [...this.selectedFiles, ...newFiles];

      // Emit the updated file list to the parent
      this.fileSelected.emit(this.selectedFiles);
    }
  }
}
