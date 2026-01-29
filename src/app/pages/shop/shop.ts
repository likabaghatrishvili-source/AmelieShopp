import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { CartService } from '../../core/services/cart.service';
import { GelPricePipe } from '../../shared/pipes/gel-price.pipe';
import { TruncatePipe } from '../../shared/pipes/truncate.pipe';

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink, GelPricePipe, TruncatePipe],
  templateUrl: './shop.html',
  styleUrl: './shop.css'
})
export class ShopComponent {
  private products = inject(ProductsService);
  private cart = inject(CartService);

  q = signal('');
  price = signal<'all'|'0-100'|'100-200'|'200-300'|'300-400'|'400+'>('all');

  items = computed(() => {
    const all = this.products.items();
    const query = this.q().toLowerCase().trim();
    const p = this.price();

    return all.filter(x => {
      const okQ = !query || x.title.toLowerCase().includes(query);
      const okP =
        p === 'all' ||
        (p === '0-100' && x.price <= 100) ||
        (p === '100-200' && x.price >= 100 && x.price <= 200) ||
        (p === '200-300' && x.price >= 200 && x.price <= 300) ||
        (p === '300-400' && x.price >= 300 && x.price <= 400) ||
        (p === '400+' && x.price >= 400);
      return okQ && okP;
    });
  });

  add(id: number) {
    const item = this.products.items().find(p => p.id === id);
    if (item) this.cart.add(item);
  }
}
