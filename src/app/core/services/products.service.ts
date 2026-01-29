import { HttpClient } from '@angular/common/http';
import { Injectable, computed, signal } from '@angular/core';
import { catchError, of } from 'rxjs';

export type Product = { id: number; title: string; price: number; image: string };

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private _items = signal<Product[]>([]);
  items = computed(() => this._items());

  constructor(private http: HttpClient) {
    this.http.get<Product[]>('assets/products.json')
      .pipe(
        catchError((err) => {
          console.error('Failed to load products.json', err);
          return of([]);
        })
      )
      .subscribe((data) => this._items.set(data || []));
  }
}
