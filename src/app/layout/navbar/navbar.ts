import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../../core/services/cart.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class NavbarComponent {
  private cart = inject(CartService);
  private auth = inject(AuthService);

  cartCount = computed(() => this.cart.count());
  isLoggedIn = computed(() => this.auth.isLoggedIn());
  isAdmin = computed(() => this.auth.isAdmin());

  logout() { this.auth.logout(); }
}
