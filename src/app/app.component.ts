import { Component, HostListener, OnInit, signal } from '@angular/core';
import { LeftSidebarComponent } from './left-sidebar/left-sidebar.component';
import { MainComponent } from './main/main.component';
import { SearchComponent } from './search/search.component';
import { FormComponent } from './form/form.component';
import { AjouteAntecedentComponent } from './ajoute-antecedent/ajoute-antecedent.component';
import { AjouteConsultationComponent } from './ajoute-consultation/ajoute-consultation.component';
import { AjoutePrescriptionComponent } from './ajoute-prescription/ajoute-prescription.component';
import { AjouteTraitementComponent } from './ajoute-traitement/ajoute-traitement.component';
@Component({
  selector: 'app-root',

  standalone: true,
  imports: [LeftSidebarComponent, MainComponent,SearchComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  nssValue: string = '';
  isLeftSidebarCollapsed = signal<boolean>(false);
  screenWidth = signal<number>(window.innerWidth);

  @HostListener('window:resize')
  onResize() {
    this.screenWidth.set(window.innerWidth);
    if (this.screenWidth() < 768) {
      this.isLeftSidebarCollapsed.set(true);
    }
  }

  ngOnInit(): void {
    this.isLeftSidebarCollapsed.set(this.screenWidth() < 768);
  }

  changeIsLeftSidebarCollapsed(isLeftSidebarCollapsed: boolean): void {
    this.isLeftSidebarCollapsed.set(isLeftSidebarCollapsed);
  }


  nssInput: string = '';
  isFormVisible: boolean = false;

  // This method handles toggling the form visibility
  onToggleForm(isVisible: boolean): void {
    this.isFormVisible = isVisible;
  }
}
