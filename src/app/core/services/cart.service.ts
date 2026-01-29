import { Injectable, computed, signal } from '@angular/core';
import type { Product } from './products.service';

type CartItem = Product & { qty: number };

@Injectable({ providedIn: 'root' })
export class CartService {
  private _items = signal<CartItem[]>([]);
  items = computed(() => this._items());
  count = computed(() => this._items().reduce((s, x) => s + x.qty, 0));
  total = computed(() => this._items().reduce((s, x) => s + x.qty * x.price, 0));

  add(p: Product) {
    const list = this._items();
    const found = list.find(x => x.id === p.id);
    if (found) {
      this._items.set(list.map(x => x.id === p.id ? { ...x, qty: x.qty + 1 } : x));
    } else {
      this._items.set([...list, { ...p, qty: 1 }]);
    }
  }

  inc(id: number) {
    this._items.set(this._items().map(x => x.id === id ? { ...x, qty: x.qty + 1 } : x));
  }

  dec(id: number) {
    this._items.set(this._items()
      .map(x => x.id === id ? { ...x, qty: x.qty - 1 } : x)
      .filter(x => x.qty > 0)
    );
  }

  remove(id: number) { this._items.set(this._items().filter(x => x.id !== id)); }
  clear() { this._items.set([]); }
}
