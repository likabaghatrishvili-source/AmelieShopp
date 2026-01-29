import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, of, tap } from 'rxjs';

type User = { email: string; role: 'user' | 'admin' };
type AuthResponse = { token: string; user: User };

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _user = signal<User | null>(this.readUser());
  user = computed(() => this._user());
  isLoggedIn = computed(() => !!this._user());
  isAdmin = computed(() => this._user()?.role === 'admin');

  private API = 'http://localhost:3000'; // backend url (json-server / express)

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post<AuthResponse>(`${this.API}/login`, { email, password }).pipe(
      tap((res) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
        this._user.set(res.user);
      }),
      map(() => true),
      catchError(() => of(false))
    );
  }

  signup(email: string, password: string) {
    return this.http.post<AuthResponse>(`${this.API}/signup`, { email, password }).pipe(
      tap((res) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
        this._user.set(res.user);
      }),
      map(() => true),
      catchError(() => of(false))
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this._user.set(null);
  }

  token() { return localStorage.getItem('token'); }

  private readUser(): User | null {
    const raw = localStorage.getItem('user');
    if (!raw) return null;
    try { return JSON.parse(raw); } catch { return null; }
  }
}
