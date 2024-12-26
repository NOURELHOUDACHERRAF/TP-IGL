import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UploadRadioComponent } from './upload-radio/upload-radio.component';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, UploadRadioComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  onConfirm() {
    console.log('Form Confirmed!');
  }
}
