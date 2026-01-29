import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService, Product } from '../../core/services/products.service';
import { GelPricePipe } from '../../shared/pipes/gel-price.pipe';

@Component({
  standalone: true,
  imports: [CommonModule, GelPricePipe],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class AdminComponent {
  private products = inject(ProductsService);
  items = this.products.items; // computed

  // Demo form (UI). Real CRUD backend-ზე რომ გექნება მერე დავუკავშიროთ.
  title = signal('');
  price = signal(0);
  image = signal('assets/p1.jpg');

  addLocal() {
    // NOTE: products.json არის static; აქ უბრალოდ UI დემოა.
    alert('Admin UI მზადაა. რეალური CRUD backend-ზე დაგიკავშირებ როცა გაუშვებ API-ს.');
  }
}
