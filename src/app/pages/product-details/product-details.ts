import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { CartService } from '../../core/services/cart.service';
import { GelPricePipe } from '../../shared/pipes/gel-price.pipe';

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink, GelPricePipe],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css'
})
export class ProductDetailsComponent {
  private route = inject(ActivatedRoute);
  private products = inject(ProductsService);
  private cart = inject(CartService);

  id = computed(() => Number(this.route.snapshot.paramMap.get('id')));
  product = computed(() => this.products.items().find(p => p.id === this.id()));

  add() {
    const p = this.product();
    if (p) this.cart.add(p);
  }
}
