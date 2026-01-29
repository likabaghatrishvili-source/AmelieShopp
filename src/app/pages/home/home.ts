import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { GelPricePipe } from '../../shared/pipes/gel-price.pipe';

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink, GelPricePipe],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent {
  products = inject(ProductsService);
}
