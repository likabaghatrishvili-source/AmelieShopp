import { HttpClient } from '@angular/common/http';
import { Injectable, computed, signal } from '@angular/core';

export type Product = { id: number; title: string; price: number; image: string };

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private _items = signal<Product[]>([]);
  items = computed(() => this._items());

  constructor(private http: HttpClient) {
    this.http.get<Product[]>('assets/products.json').subscribe({
      next: (data) => this._items.set(data || []),
      error: () => this._items.set([])
    });
  }
}
