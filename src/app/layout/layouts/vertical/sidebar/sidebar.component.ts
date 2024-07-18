import { Component, ViewChild } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SharedModule } from '../../../../shared/shared.module';
import { MatSidenav } from '@angular/material/sidenav';
import { NAVIGATION } from '../../../../core/navigation/navigation.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, SharedModule],
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {
  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  public links = NAVIGATION;
}
