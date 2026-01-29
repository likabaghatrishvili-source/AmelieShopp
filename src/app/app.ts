import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './layout/navbar/navbar';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  template: `
    <app-navbar></app-navbar>
    <main class="page">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    .page { padding: 18px 0 48px; }
  `]
})
export class AppComponent {}
