import { Component, ViewChild, ElementRef, HostListener, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SharedModule } from '../../../../shared/shared.module';
import { NAVIGATION } from '../../../../core/navigation/navigation.service';
import { filter } from 'rxjs/operators';

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

  constructor(private router: Router) {}

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
    // Escucha los cambios en la ruta
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      if (this.isOpen) {
        this.isOpen = false; // Cierra el sidebar cuando la ruta cambia
      }
    });
  }
}