import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../core/services/cart.service';
import { GelPricePipe } from '../../shared/pipes/gel-price-pipe';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, GelPricePipe, RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class CartComponent {
  private cart = inject(CartService);
  items = computed(() => this.cart.items());
  total = computed(() => this.cart.total());

  inc(id: number) { this.cart.inc(id); }
  dec(id: number) { this.cart.dec(id); }
  remove(id: number) { this.cart.remove(id); }
  clear() { this.cart.clear(); }
}
