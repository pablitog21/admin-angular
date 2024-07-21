import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NAVIGATION } from '../../../../core/navigation/navigation.service';
import { SharedModule } from '../../../../shared/shared.module';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  currentLabel: string = 'Loading...';  // Valor predeterminado seguro
  isSidebarOpen: boolean = false;  // Estado del sidebar

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.updateCurrentLabel(this.router.url);  // Actualiza la etiqueta actual en la inicialización

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.updateCurrentLabel(event.urlAfterRedirects);
    });
  }

  private updateCurrentLabel(url: string): void {
    const currentRoute = NAVIGATION.find(nav => nav.routerLink === url);
    this.currentLabel = currentRoute ? currentRoute.label : 'Unknown';
  }

  logout(){
    this.router.navigateByUrl('/sign-in');
  }
}
