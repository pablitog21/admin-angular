import { Component, ViewChild, ElementRef, HostListener, AfterViewInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SharedModule } from '../../../../shared/shared.module';
import { NAVIGATION } from '../../../../core/navigation/navigation.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, SharedModule],
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements AfterViewInit {
  @ViewChild('sidebar') sidebar!: ElementRef;
  public links = NAVIGATION;
  public isOpen: boolean = false;

  toggle(): void {
    this.isOpen = !this.isOpen;
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event): void {
    const headerElement = document.querySelector('app-header');
    if (this.isOpen && !this.sidebar.nativeElement.contains(event.target) && !headerElement?.contains(event.target as Node)) {
      this.isOpen = false;
    }
  }

  ngAfterViewInit() {
    // Este método se asegura de que el elemento sidebar esté disponible antes de usarlo
  }
}
